import jwt from 'jsonwebtoken';

const Helper = {

  generateToken(id, email) {
    const token = jwt.sign({
      Id: id,
      userEmail: email,
    },
    process.env.privatekey, { expiresIn: '1d' });
    return token;
  },
  verifyToken(token) {
    return jwt.verify(token, process.env.privatekey);
  },
};

export default Helper;
