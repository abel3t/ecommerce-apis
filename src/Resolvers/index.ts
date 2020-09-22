import { IResolvers } from 'graphql-tools';

import userQueries from './Queries/UserQueries';

export const resolvers: IResolvers = {
  Query: {
    ...userQueries
  }
};