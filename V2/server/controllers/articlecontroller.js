
import dotenv from 'dotenv';
import Model from '../model/dbqueries';

import verifytoken from '../../../V1/server/helpers/tokens';

dotenv.config();

class articleController {
  static model() {
    return new Model('articles');
  }

  static createArticle = async (req, res) => {
    const token = req.header('token');
    const decode = verifytoken.verifyToken(token);
    try {
      let {
        title,
        article,
        category,

      } = req.body;
      const authorid = decode.userEmail;

      const cols = 'title, article,category,author_id';

      const sels = `'${title}', '${article}', '${category}', '${authorid}'`;
      let row = await this.model().insert(cols, sels);

      return res.status(201).json({
        status: 201,
        message: ' article successfully created',
        data: {
          row,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: e,
      });
    }
  }
}
export default { articleController };
