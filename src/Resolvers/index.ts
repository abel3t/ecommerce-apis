import { IResolvers } from 'graphql-tools';

import userQueries from './Queries/OrderQueries';

export const resolvers: IResolvers = {
  Query: {
    ...userQueries
  }
};