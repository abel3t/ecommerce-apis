import { catchErrors } from '../Utils/Errors';

export default catchErrors((_req, res) => {
  return res.json({
    status: 'OK'
  });
});