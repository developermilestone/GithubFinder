import { resolvers, typeDefs } from "@/graphql";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getSession } from "@auth0/nextjs-auth0";
import { AuthenticationError } from 'apollo-server-errors';
import { NextRequest, NextResponse } from "next/server";
  
const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
    persistedQueries: false,
    introspection: process.env.NODE_ENV !== 'production',
   
});

const handler = startServerAndCreateNextHandler(server as any, {
        context: async (req: NextRequest) => {
                const session = await getSession(req, new NextResponse());
                
            if (!session) {
                throw new AuthenticationError('You must be logged in to access this resource');
            }
    
            return { session };
        },
});

export { handler as GET, handler as POST };
