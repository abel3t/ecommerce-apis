import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';
import { resolvers } from 'Resolvers';
import { Express } from 'express';
import path from 'path';

export default {
  createApolloServer: async () => {
    const { typeDefs, resolvers } = await initializeSchema();
    return new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        const token: string = req.headers.authorization || '';
        if (!token) {
          throw new AuthenticationError('you must be logged in');
        }
        return { name: 'OK' };
      }
    });
  },
  applyApolloOnExpress: (app: Express, server: ApolloServer) => {
    server.applyMiddleware({ app });
  },
};

async function initializeSchema() {
  const getTypeDefs = async () => {
    return loadFiles(path.join(__dirname, '../Schemas/*.graphql'));
  };

  const typeDefs = mergeTypeDefs(await getTypeDefs());

  return {
    typeDefs,
    resolvers
  };
}