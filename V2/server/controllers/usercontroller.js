import Model from '../model/dbqueries';
import Token from '../helpers/tokens';


class UserController {
  static model() {
    return new Model('users');
  }

  static signUp = async (req, res) => {
    try {
      let {
        first_name,
        last_name,
        email,
        password,
        gender,
        jobrole,
        department,
        address,
      } = req.body;

      const user = await this.model().select('*', 'email=$1', [email]);
      if (user[0]) {
        return res.status(409).send({ status: 409, error: `${req.body.email} is already taken!` });
      }

      const cols = 'first_name, last_name,email,password,gender,jobrole,department,address';

      const sels = `'${first_name}', '${last_name}', '${email}', '${password}', '${gender}', '${jobrole}', '${department}', '${address}'`;
      let row = await this.model().insert(cols, sels);

      let token = Token.generateToken(row[0].id, row[0].email);
      console.log(user);
      return res.status(201).json({
        status: 201,
        message: 'User Created Successfully',
        data: {
          token,

        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: e,
      });
    }
  };

  static signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const isLogin = await this.model().select('*', 'email=$1', [email]);
      if (isLogin[0] && (password === isLogin[0].password)) {
        const token = Token.generateToken(isLogin[0].id, isLogin[0].email);
        const data = {
          token,
        };
        return res.status(200).json({
          status: 200,
          message: 'User Is successfully Logged In',
          data: {
            data,
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
export default { UserController };
