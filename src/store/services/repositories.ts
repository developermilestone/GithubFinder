
import { ADD_FAVORITE_REPOSITORY_MUTATION, BULK_SEARCH_QUERY, REMOVE_FAVORITE_REPOSITORY_MUTATION, SEARCH_REPOSITORIES_QUERY } from '@/graphql/queries';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const prepareHeaders = (headers: Headers): Headers => {
  return headers;
};

export const repositories = createApi({
    reducerPath: 'repositoriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/graphql',
        prepareHeaders,
    }),
    endpoints: builder => ({
        fetchRepositories: builder.query({
          query: ({ searchTerm, after, first }) => ({
            url: '',
            method: 'POST',
            body: {
              query: SEARCH_REPOSITORIES_QUERY,
              variables: { query: searchTerm, first, after },
            },
          }),
          transformResponse: response => (response as { data: { getRepositories: any } })?.data?.getRepositories,
        }),
        fetchBulkRepositories: builder.query({
          query: searchTerm => ({
            url: '',
            method: 'POST',
            body: {
              query: BULK_SEARCH_QUERY,
              variables: { query: searchTerm },
            },
          }),
          transformResponse: response => {return (response as { data: { getBulkRepositories: any } })?.data?.getBulkRepositories},
        }),
        addFavoriteRepository: builder.mutation({
          query: (newRepository) => ({
            url: '',
            method: 'POST',
            body: {
              query: ADD_FAVORITE_REPOSITORY_MUTATION,
              variables: {repositoryId: newRepository.id, nameWithOwner: newRepository.nameWithOwner, rating: newRepository.rating},
            },
          }),
        }),
        removeFavoriteRepository: builder.mutation({
          query: (repository) => ({
            url: '',
            method: 'POST',
            body: {
              query: REMOVE_FAVORITE_REPOSITORY_MUTATION,
              variables: { repositoryId: repository.id },
            },
          }),
        }),
    }),
});

export const {
  useFetchRepositoriesQuery,
  useAddFavoriteRepositoryMutation,
  useRemoveFavoriteRepositoryMutation,
  useFetchBulkRepositoriesQuery
} = repositories;
