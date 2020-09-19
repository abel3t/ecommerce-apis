import { catchErrors } from 'Core/asyncCatch';

export default catchErrors((_req, res) => {
  return res.json({
    status: 'OK'
  });
});