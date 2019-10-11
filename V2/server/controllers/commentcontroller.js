
import dotenv from 'dotenv';
import Model from '../model/dbqueries';

import verifytoken from '../helpers/tokens';


let authorid;
dotenv.config();

class commentController {
  static model() {
    return new Model('comments');
  }

  static createcomment = async (req, res) => {
    const { articleId } = req.params;

    if (isNaN(articleId)) {
      return res.status(404).send({
        status: 404,
        error: 'article Id should be an integer',
      });
    }
    const token = req.header('token');
    const decode = verifytoken.verifyToken(token);
    try {
      let { comment } = req.body;
      authorid = decode.userEmail;

      const cols = 'articleid,comment,author_id';

      const sels = `'${articleId}', '${comment}', '${authorid}'`;
      let row = await this.model().insert(cols, sels);

      return res.status(201).json({
        status: 201,
        message: ' comment successfully created',
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
export default { commentController };
