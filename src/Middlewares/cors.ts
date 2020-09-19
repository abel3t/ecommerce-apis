import { catchErrors } from 'Core/asyncCatch';

export const cors = catchErrors((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});
