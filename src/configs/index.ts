export const enableDevTools = process.env.NEXT_PUBLIC_ENABLE_REDUX_DEV_TOOLS === 'true';

export const auth0Config = {
  base_url: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
  client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  issuer_base_url: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
};
