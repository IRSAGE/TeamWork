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
}
export default { UserController };
