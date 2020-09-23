import { IResolvers } from 'graphql-tools';

import Auth from './Auth';

export const resolvers: IResolvers = {
  Query: {
    ...Auth.Query
  },
  Mutation: {
    ...Auth.Mutation
  },
  Subscription: {
    ...Auth.Subscription
  }
};