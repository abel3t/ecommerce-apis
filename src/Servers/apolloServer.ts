import path from 'path';

import { Express } from 'express';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { ApolloServer, AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express';

import { resolvers } from 'Resolvers';
import { verifyToken } from 'Core/Jwt';
import { ROLES } from 'Core/Constants/common';
import { INVALID_TOKEN } from 'Core/Constants';

export default {
  createApolloServer: async () => {
    return new ApolloServer({
      typeDefs: await createTypeDef(),
      resolvers,
      schemaDirectives: {
        auth: AuthDirective
      },
      context: ({ req }) => {
        const token: string = req.headers.authorization || '';
        if (token) {
          const user: any = verifyToken(token);
          if (user) {
            return {
              userToken: {
                role: user.role,
                userId: user.userId
              }
            };
          }
          throw new AuthenticationError(INVALID_TOKEN);
        }
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

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { requiredRole = ROLES.GUESTS } = this.args;
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async (...args) => {
      const { userToken = {} } = args[2];
      const isAuthorized = requiredRole && userToken.role === requiredRole;

      if (!isAuthorized) {
        throw new AuthenticationError(`You need following role: ${requiredRole}`);
      }

      return originalResolve.apply(this, args);
    };
  }
}