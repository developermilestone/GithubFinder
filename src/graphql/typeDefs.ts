import gql from "graphql-tag";
const typeDefs = gql`

    type ProgrammingLanguage {
        id: ID!
        name: String!
        color: String
    }


    type Repository {
        id: ID!
        name: String!
        description: String
        url: String!
        nameWithOwner: String!
        languages: [ProgrammingLanguage]
    }
    type Response {
        data: [Repository!]!
        pagination: Pagination!
    }
    type Pagination {
        hasNextPage: Boolean!
        endCursor: String!
    }
    type FavoriteRepository {
        id: ID!
        name: String!
        description: String
        url: String!
        nameWithOwner: String!
        languages: [ProgrammingLanguage]
        rating: Int!
        isFavorite: Boolean!
    }


    type FavoriteRepositoryRelation {
        id: Int!
        repositoryId: String!
        nameWithOwner: String!
        rating: Int!
        userId: String!
    }

    type Query {

        getRepositories(query: String, first: Int, after: String): Response!

        getBulkRepositories(query: String): [FavoriteRepository!]!
    }

    type Mutation {
       
        addFavoriteRepository(
            repositoryId: String!
            nameWithOwner: String!
            rating: Int!
        ): FavoriteRepositoryRelation

       
        removeFavoriteRepository(repositoryId: String!): FavoriteRepositoryRelation
    }
`;

export default typeDefs;