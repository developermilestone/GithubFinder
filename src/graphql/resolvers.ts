import { externalPath } from "@/configs/paths";
import prisma from "@/libs/prisma";

interface Repository {
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

interface Language {
  id: string;
  name: string;
  color: string;
}

interface GitHubResponse {
  search: {
    edges: Array<{
      node: Repository;
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

// Refactor the GraphQL fetch function for reusability
async function fetchGitHubGraphQL(query: string, variables: { [key: string]: any }): Promise<GitHubResponse> {
  const response = await fetch(externalPath.githubApi, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data } = await response.json();
  return data;
}

// Reusable function to transform repository edges
function transformRepositoryEdges(edges: Array<{ node: Repository }>): Array<Repository> {
  return edges.map(edge => ({
    ...edge.node,
    languages: edge.node.languages.edges.map(langEdge => langEdge.node)
  }));
}

const repositoryQuery = `...`; // same as before

export const resolvers = {
  Query: {
    getRepositories: async (_: any, { query }: { query: string }, { session }: Context) => {
      const response = await fetchGitHubGraphQL(repositoryQuery, { query });
      return transformRepositoryEdges(response.search.edges);
    },
    getBulkRepositories: async (_: any, {}: any, { session }: Context) => {
      const favorites = await prisma.favoriteRepository.findMany({
        where: { userId: session.user.sub },
      });

      const favoriteRepoQuery = favorites.map(favorite => `repo:${favorite.nameWithOwner}`).join(' ');
      const response = await fetchGitHubGraphQL(repositoryQuery, { query: favoriteRepoQuery });

      return response.search.edges.map(edge => {
        const favorite = favorites.find(favorite => favorite.repositoryId === edge.node.id);
        return ({
          ...transformRepositoryEdges([edge])[0],
          isFavorite: !!favorite,
          rating: favorite?.rating,
        });
      });
    },
  },
  Mutation: {
    addFavoriteRepository: async (_: any, args: { repositoryId: string; nameWithOwner: string; rating: number }, context: Context) => {
      const { repositoryId, nameWithOwner, rating } = args;
      return prisma.favoriteRepository.create({
        data: {
          repositoryId,
          nameWithOwner,
          rating,
          userId: context.session.user.sub
        }
      });
    },
    removeFavoriteRepository: async (_: any, { repositoryId }: { repositoryId: string }, context: Context) => {
      return prisma.favoriteRepository.deleteMany({
        where: { repositoryId, userId: context.session.user.sub },
      });
    }
  }
};
