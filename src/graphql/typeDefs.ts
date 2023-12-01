import { gql } from 'apollo-server-micro';

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
        languages: [ProgrammingLanguage!]
    }

    type FavoriteRepository {
        id: ID!
        name: String!
        description: String
        url: String!
        nameWithOwner: String!
        languages: [ProgrammingLanguage!]
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

        getRepositories(query: String): [Repository!]!

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