import dotenv from 'dotenv';
import User from '../model/userModel';
import Token from '../helpers/tokens';


const users = [
  {
    id: 1,
    firstName: 'Iragena',
    lastName: 'sage',
    email: 'user678@gmail.com',
    password: 'iragenaegide',
    gender: 'female',
    jobRole: 'programmer',
    department: 'it',
    address: 'kabuga',

  },
];

dotenv.config();
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
         },
       });
     };

     static signIn = (req, res) => {
       try {
         const isLogin = (email, password) => users.find(user => (user.email === email)
     && (users.find(u => (u.password === password))));
         const token = Token.generateToken(users.id, req.body.email);
         if (isLogin(req.body.email, req.body.password)) {
           return res.status(200).json({
             status: 200,
             message: 'User Is successfully Logged In',
             data: {
               token,
             },
           });
         }

         return res.status(401).json({
           status: 401,
           error: 'Invalid Email or Password',
         });
       } catch (e) {
         return res.status(500).json({
           status: 500,
           error: 'server error',
         });
       }
     }
}
export default { UserController, users };
