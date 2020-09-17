import express from 'express';
import cors from 'cors';

import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';

import * as logger from 'Utils/logger';
import { handleError } from 'Middlewares/next';
import { RouteNotFoundError } from 'Utils/Errors';

import { attachPublicRoutes } from './routes';

const initializeExpress = (): void => {
  const app = express();

  app.use(cors());

  attachPublicRoutes(app);

  app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
  app.use(handleError);

  const { PORT = 8080 } = process.env;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

const initializeApp = async (): Promise<void> => {
  initializeExpress();
};

initializeApp();
