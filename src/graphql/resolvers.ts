import { externalPath } from '@/configs/paths';
import prisma from '@/libs/prisma';

interface RepositoryRequest {
    id: string;
    name: string;
    description: string;
    nameWithOwner: string;
    url: string;
    languages: {
        edges: Array<{
            node: Language;
        }>;
    };
}
interface Repository {
    id: string;
    name: string;
    description: string;
    nameWithOwner: string;
    url: string;
    languages: Language[];
}
export interface RepositoryResponse {
    data: Repository[];
    pagination: Pagination;
}
interface Language {
    id: string;
    name: string;
    color: string;
}
interface Pagination {
    hasNextPage: boolean;
    endCursor: string;
}
interface GitHubResponse {
    search: {
        pageInfo: Pagination;
        edges: Array<{
            node: RepositoryRequest;
        }>;
    };
}

interface FavoriteRepository {
    repositoryId: string;
    nameWithOwner: string;
    rating?: number;
    userId: string;
}

interface Session {
    user: {
        sub: string;
    };
}

interface Context {
    session: Session;
}

async function fetchGitHubGraphQL(query: string, variables: { [key: string]: any }): Promise<GitHubResponse> {
    const response = await fetch(externalPath.githubApi, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    });

    const { data } = await response.json();
    return data;
}

function transformRepositoryEdges(edges: Array<{ node: RepositoryRequest }>): Array<Repository> {
    return edges.map(edge => ({
        ...edge.node,
        languages: edge.node.languages.edges.map(langEdge => langEdge.node),
    }));
}

const repositoryQuery = `
  query search($query: String!, $first: Int, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            nameWithOwner
            url
            languages (first: 1){
              edges {
                node {
                  id
                  name
                  color
                }
              }
            }
          }
        }
      },
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const resolvers = {
    Query: {
        getRepositories: async (
            _: any,
            { query, first, after }: { query: string; first: number; after: string },
            { session }: Context
        ) => {
            const response = await fetchGitHubGraphQL(repositoryQuery, { query, first, after });

            const repositories = transformRepositoryEdges(response.search.edges);
            return { data: repositories, pagination: response.search.pageInfo };
        },
        getBulkRepositories: async (_: any, {}: any, { session }: Context) => {
            const favorites = await prisma.favoriteRepository.findMany({
                where: { userId: session.user.sub },
            });

            if (!favorites.length) {
                return [];
            }
            const favoriteRepoQuery = favorites.map(favorite => `repo:${favorite.nameWithOwner}`).join(' ');
            const response = await fetchGitHubGraphQL(repositoryQuery, {
                query: favoriteRepoQuery,
                first: 100,
                after: null,
            });

            return response.search.edges.map(edge => {
                const favorite = favorites.find(favorite => favorite.repositoryId === edge.node.id);
                return {
                    ...transformRepositoryEdges([edge])[0],
                    isFavorite: !!favorite,
                    rating: favorite?.rating,
                };
            });
        },
    },
    Mutation: {
        addFavoriteRepository: async (
            _: any,
            args: { repositoryId: string; nameWithOwner: string; rating: number },
            context: Context
        ) => {
            const { repositoryId, nameWithOwner, rating } = args;

            return prisma.favoriteRepository.create({
                data: {
                    repositoryId,
                    nameWithOwner,
                    rating,
                    userId: context.session.user.sub,
                },
            });
        },
        removeFavoriteRepository: async (_: any, { repositoryId }: { repositoryId: string }, context: Context) => {
            return prisma.favoriteRepository.deleteMany({
                where: { repositoryId, userId: context.session.user.sub },
            });
        },
    },
};
