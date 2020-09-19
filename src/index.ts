import express from 'express';

import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';

import * as logger from 'Core/Logger';
import routes from './Routes';

import { handleError } from 'Middlewares/next';
import { cors } from 'Middlewares/cors';

import { NotFoundError } from 'Core/ApiError';

const initializeExpress = (): void => {
  process.on('uncaughtException', (e) => {
    logger.error(e);
  });

  const app = express();

  app.use(cors);

  app.use('/', routes);

  app.use((_req, _res, next) => next(new NotFoundError()));
  app.use(handleError);

  const { PORT = 8080 } = process.env;
  app
    .listen(PORT, () => logger.info(`Server running on port ${PORT}`))
    .on('error', e => logger.error(e));
};

const initializeApp = () => {
  initializeExpress();
};

initializeApp();
