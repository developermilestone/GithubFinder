import { resolvers } from "@/graphql/resolvers";
import typeDefs from "@/graphql/typeDefs";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { Session, getSession } from "@auth0/nextjs-auth0";
import { ApolloServer } from "apollo-server-micro";
import type { NextApiHandler } from "next";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  session: Session | null;
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }: { req: NextRequest }): Promise<Context> => {
        const session = await getSession(req, new NextResponse()) ?? null;
        return { session };
    },
});

// Specifying the handler type as NextApiHandler
const handler: NextApiHandler = startServerAndCreateNextHandler(server as any, {
    context: async (req: NextRequest) => {
        const session = await getSession(req, new NextResponse());
        return { session };
    },
});

export { handler as GET, handler as POST };
