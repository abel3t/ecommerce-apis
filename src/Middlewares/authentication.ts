import { Request } from 'express';

import { verifyToken } from 'Utils/authToken';
import { catchErrors, InvalidTokenError } from 'Utils/Errors';

export const authenticateUser = catchErrors(async (req, _res, next) => {
  const token = getAuthTokenFromRequest(req);
  if (!token) {
    throw new InvalidTokenError('Authentication token not found.');
  }

  const userId = verifyToken(token).sub;
  if (!userId) {
    throw new InvalidTokenError('Authentication token is invalid.');
  }

  req.userToken = {
    userId
  };

  next();
});

const getAuthTokenFromRequest = (req: Request): string | null => {
  const header = req.get('Authorization') || '';
  const [ bearer, token ] = header.split(' ');
  return bearer === 'Bearer' && token ? token : null;
};
