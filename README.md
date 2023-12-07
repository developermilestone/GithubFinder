# GithubFinder

## Table of Content
- [GithubFinder](#githubfinder)
  - [Table of Content](#table-of-content)
  - [Overview](#overview)
  - [Live Demo](#live-demo)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
  - [Detail Documentation](#detail-documentation)
    - [Database](#database)
    - [Authentication in Github Finder](#authentication-in-github-finder)
      - [Authentication Flow](#authentication-flow)
      - [Configuration](#configuration)
    - [Backend For Frontend (BFF)](#backend-for-frontend-bff)
    - [The Structure of the code](#the-structure-of-the-code)
    - [RTK Query](#rtk-query)
  - [Solution Diagram](#solution-diagram)
    - [Application](#application)
    - [Components](#components)

## Overview

Github Finder is my test built to search GitHub repositories and add them as favorites to my account.

As part of the development, build a complete stack application, which has authentication, the implementation of API Gateway in GraphQL on the BE side, to interact with external services such as communication with the GitHub API or for the operation of internal services for store favorites lists. The application has Prisma ORM integration, making operating our database easier and storing the data safely.
On the FE side, I rely on using MaterialUI as the project design base, the redux toolkit as our state manager, and internationalization with i18n.

## Live Demo
https://github-finder-qihd.vercel.app/

Try it ;)

## Tech Stack

- Next.js with app router [docs](https://nextjs.org/docs)
- React [docs](https://react.dev/)
- Redux [docs](https://redux.js.org/)
- RTK Queries [docs](https://redux-toolkit.js.org/introduction/getting-started)
- Typescript
- Prisma
- GraphQl
- Github Graph API
- i18n
- MaterialUI
- Auth0
- PostgreSQL

## Getting Started

To get started with Github Finder Project, follow these steps:

1. **Clone the Repository**: Clone the project repository from our GitHub repository

2. **Install Dependencies**: Run `npm install` to install the necessary dependencies.

3. **Configuration**: Make sure you copy the `.env.example` file at the root of the project to a `.env` file and update it accordingly

4. **Start the Development Server**: Run `npm run dev` to start the development server.

5. **Build the Project**: Run `npm run build` to start the development server.

6. **Run test coverage**: Run `npm run test:coverage` to start the development server.

7. **Explore**: You can visit the app on [localhost:3000](http://localhost:3000)

## Detail Documentation

### Database

I'm using PostgreSQL database from Vercel to keep the favourites from user's accounts.

To configure you need to add the following variable in your `.env` file

```
    POSTGRES_PRISMA_URL="postgres://default:1aEdGKFxwc3k@ep-nameless-wood-87509350-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
    POSTGRES_URL_NON_POOLING="postgres://default:1aEdGKFxwc3k@ep-nameless-wood-87509350.eu-central-1.postgres.vercel-storage.com:5432/verceldb"
```


### Authentication in Github Finder

#### Authentication Flow

For authentication and authorization in Github Finder, we utilize Auth0 as the OAuth provider.

#### Configuration

To configure authentication for Github Finder, define the required environment variables for your Auth0 configuration. 
  These should include the Auth0 domain and client ID.
```dotenv
AUTH0_SECRET='ecefeadade8230e53a78f1efa6e08f92815764c41c13c948a9b0fd40d00d554c'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://dev-p5zfvk0lbde1fap8.eu.auth0.com'
AUTH0_CLIENT_ID='pPO5HKqpYx4Rval0OemTxmFcrAUGtRxZ'
AUTH0_CLIENT_SECRET='ECiK_IN26gtxG2zPnlvowc9Ej_xUrvmCmKNl3pA9FN4oWUer3a0m3q2Ry2zHMHDt'
APP_KEY='6b1a5b3f14386639381990231d0f674ac97179afc9c587c3dd0cd174e58bc894'
```


This approach ensures that the token is readily available for use throughout 
the application. To facilitate its inclusion in every API request, we employ the Authorization header, received from Auth0.
This header is automatically added to `GraphQl` requests.

### Backend For Frontend (BFF)

I use the Next.js [route handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) to create a BFF as a middleman to call our backend APIs. The reasons I'm using a BFF instead of directly calling the APIs is [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), and used set and run graphql server as our API Gateway.

### The Structure of the code

1. **Components**: There are different types of components, that together form a page.
    * The `page` component is responsible for rendering the page. This component is directly
      imported by the app router pages. It should ideally act as a container and fetch all
      the necessary data (using RTK Query) and pass them to other components.
    * Other components should not (ideally) interact with APIs and should only use
      Redux store. These components are usually suffixed by `table`, `detail`, or `component`.
2. **Components Structure**:
    ```
      └── Example
         ├── component.tsx
         ├── component.test.tsx
         ├── container.tsx
         └── index.ts
    ```
    The container handles the state and the store access. The component is then left to just render, depending only on the props that are provided by the container. Any logic that is triggered from the component, eg. a callback on a button click, is defined in the container.

3. **Hooks**: We use hooks to encapsulate logic and data transformation, making our components
   thinner, and easier to work with.
4. **Slices**: Each component should provide its own slice to interact with the Redux store
5. **Services**: The only service we have for each component now is the RTK Query API
6. **Types**: This is the directory to store model information for each module.
7. **GraphQl**: This is the directory to where i have the configuration related with graphql.
8. **Providers**: This is the directory to keep all the providers of our app.
9. **Layouts**: This is the directory to keep all root layout to be shared between all project pages.
10. **Translations**: This is the directory to keep all translation keys files.
11. **Theme**: This is the directory to have all the configuration for project theme.
12. **Api**: This is the directory to have all the configuration for project theme.
   * **Auth**: This is the route who handle with the authentication.
   * **Graphql**: This is the route handle with the graphql server.

### RTK Query

In order to simplify API queries, a better alternative to [React Query](https://tanstack.com/query/v3/), i.e. [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) is being used to send async API queries to the backend APIs using Redux Thunks. It stores the data and the cache keys in Redux stores.


## Solution Diagram

### Application
![image](https://github.com/developermilestone/GithubFinder/assets/152653061/a3ee7ca5-5886-42c0-98f5-8cbf5b9e3ba7)
### Components
![image](https://github.com/developermilestone/GithubFinder/assets/152653061/33e478f4-eb3a-41b5-aa37-9544d72fae39)

