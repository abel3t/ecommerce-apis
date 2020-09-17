import status from 'Controllers/status';

export const attachPublicRoutes = (app: any): void => {
  app.get('/', status);
};