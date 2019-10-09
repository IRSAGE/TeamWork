import Model from '../model/dbqueries';
import verifytoken from '../../../V1/server/helpers/tokens';

const model = new Model('users');

const verifyUser = async (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(400).send({
      status: 400,
      error: 'Provide a Token',
    });
  }
  try {
    const decode = verifytoken.verifyToken(token);
    const email = decode.userEmail;
    const user = await model.select('*', 'email=$1', [email]);

    if (!user) {
      return res.status(401).send({
        error: 'You are not a user', status: 401,

      });
    }
    next();
  } catch (error) {
    return res.status(404).send({
      status: 404,
      error: 'invalid token',
    });
  }
};
export default verifyUser;
