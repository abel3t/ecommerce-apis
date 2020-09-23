import dotenv from 'dotenv';

dotenv.config();

import 'module-alias/register';

import http from 'http';
import { expressServer, apolloServer } from 'Servers';

import connectMongoDB from 'Database/connection';
import status from 'Controllers/status';

apolloServer.createApolloServer().then(server => {
  const app = expressServer.createExpressServer();
  connectMongoDB();

  app.get('/', status);

  apolloServer.applyApolloOnExpress(app, server);

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);
  httpServer.listen({ port: process.env.PORT || process.env.APP_PORT }, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT || process.env.APP_PORT}${server.graphqlPath}`);
    }
  });
});
