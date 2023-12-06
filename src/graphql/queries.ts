export const SEARCH_REPOSITORIES_QUERY = `
    query search($query: String!, $first: Int, $after: String) {
        getRepositories(query: $query, first: $first, after: $after) {
            data {
                description
                id
                languages {
                    color
                    id
                    name
                }
                name
                url
                nameWithOwner
            }
            pagination {
                endCursor
                hasNextPage
            }
        }
    }
`;

export const BULK_SEARCH_QUERY = `
    query search2($query: String!) {
        getBulkRepositories(query: $query) {
            name
            id
            description
            languages {
                color
                id
                name
            }
            nameWithOwner
            url
            isFavorite
            rating
        }
    }
`;

export const ADD_FAVORITE_REPOSITORY_MUTATION = `
    mutation AddFavoriteRepository($repositoryId: String!, $nameWithOwner: String!, $rating: Int!) {
        addFavoriteRepository(repositoryId: $repositoryId, nameWithOwner: $nameWithOwner, rating: $rating) {
            id
            repositoryId
            nameWithOwner
            rating
        }
    }
`;

export const REMOVE_FAVORITE_REPOSITORY_MUTATION = `
    mutation RemoveFavoriteRepository($repositoryId: String!) {
        removeFavoriteRepository(repositoryId: $repositoryId) {
            id
        }
    }
`;
