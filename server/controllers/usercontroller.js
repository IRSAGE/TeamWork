import dotenv from 'dotenv';
import User from '../model/userModel';
import Token from '../helpers/tokens';


const users = [

];

dotenv.config();
// create user account


class UserController {
  // user sighup
     static signUp = (req, res) => {
       const id = users.length + 1;
       const isEmailTaken = users.find(user => user.email === req.body.email);
       if (isEmailTaken) {
         return res.status(409).send({ status: 409, error: `${req.body.email} is already taken!` });
       }

       const user = new User(
         id, req.body.firstName, req.body.lastName,
         req.body.email, req.body.password, req.body.gender,
         req.body.jobRole, req.body.department, req.body.address,
       );
       const token = Token.generateToken(user.id, user.email);

       users.push(user);

       return res.status(201).json({
         status: 201,
         message: ' User Created Successfully',
         data: {
           token,
           id: user.id,
           firstName: user.firstName,
           lastName: user.lastName,
           email: user.email,
           gender: user.gender,
           jobRole: user.jobRole,
           department: user.department,
           address: user.address,
         },
       });
     };
}
export default { UserController, users };
