import path from 'path';

import { Express } from 'express';

import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';
import { resolvers } from 'Resolvers';

export default {
  createApolloServer: async () => {
    return new ApolloServer({
      typeDefs: await createTypeDef(),
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

async function createTypeDef() {
  const getTypeDefs = async () => {
    return loadFiles(path.join(__dirname, '../Schemas/*.graphql'));
  };

  return mergeTypeDefs(await getTypeDefs());
}