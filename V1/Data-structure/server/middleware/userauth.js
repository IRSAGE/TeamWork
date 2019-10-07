/* eslint-disable import/prefer-default-export */

import user from '../controllers/usercontroller';
import verifytoken from '../helpers/tokens';


export const verifyUser = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return res.status(400).send({
      status: 400,
      error: 'Provide a Token',
    });
  }
  try {
    const decode = verifytoken.verifyToken(token);
    const loadedUser = user.users.find(u => u.email === decode.userEmail);
    if (!loadedUser) {
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
