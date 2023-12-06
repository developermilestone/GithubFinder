const externalPath = {
    githubApi: 'https://api.github.com/graphql',
}

const paths = {
    main: '/',
    favorites: '/favorites',
    api:{
        auth:{
            login: '/api/auth/login',
            logout: '/api/auth/logout',
            callback: '/api/auth/callback',
        },
        graphql: '/api/graphql',
    }
}


const menu = [
    {
        session: 'home',
        path: paths.main,
    },
    {
        session: 'favorites',
        path: paths.favorites,
    }
]
export { externalPath, menu, paths }

