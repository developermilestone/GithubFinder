//@ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const repositories = createApi({
    reducerPath: 'repositoriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/graphql',
        prepareHeaders: headers => {
            return headers;
        },
    }),
    endpoints: builder => ({
        fetchRepositories: builder.query({
            query: searchTerm => ({
                url: '',
                method: 'POST',
                body: {
                    query: `
            query search($query: String!) {
              getRepositories(query: $query) {
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
            }
            }
          `,
                    variables: { query: `${searchTerm}` },
                },
            }),
            transformResponse: response => {
                return response?.data?.getRepositories;
            },
        }),
        fetchBulkRepositories: builder.query({
          query: searchTerm => ({
            url: '',
            method: 'POST',
            body: {
                query: `
        query search($query: String!) {
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
      `,
                variables: { query: `${searchTerm}` },
            },
        }),
        transformResponse: response => {
            console.log('asdadasd', response);
            return response.data.getBulkRepositories;
        },
    }),
        addFavoriteRepository: builder.mutation({
          query: (newRepository) => ({
            url: '/',
            method: 'POST',
            body: {
              query: `
                mutation AddFavoriteRepository($repositoryId: String!, $nameWithOwner: String!, $rating: Int!) {
                  addFavoriteRepository(repositoryId: $repositoryId, nameWithOwner: $nameWithOwner, rating: $rating) {
                    id
                    repositoryId
                    nameWithOwner
                    rating
                  }
                }
              `,
              variables: {repositoryId: newRepository.id, nameWithOwner: newRepository.nameWithOwner, rating: newRepository.rating},
            },
          }),
      }),
      removeFavoriteRepository: builder.mutation({
        query: (repository) => ({
          url: '/',
          method: 'POST',
          body: {
            query: `
              mutation RemoveFavoriteRepository($repositoryId: String!) {
                removeFavoriteRepository(repositoryId: $repositoryId) {
                  id
                }
              }
            `,
            variables: {repositoryId: repository.id},
          },
        }),
    }),
    }),
});

export const { useFetchRepositoriesQuery, useAddFavoriteRepositoryMutation, useRemoveFavoriteRepositoryMutation, useFetchBulkRepositoriesQuery } = repositories;
