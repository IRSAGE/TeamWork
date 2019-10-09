
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

  static editArticle = async (req, res) => {
    const { articleId } = req.params;

    if (isNaN(articleId)) {
      return res.status(404).send({
        status: 404,
        error: 'article Id should be an integer',
      });
    }
    const token = req.header('token');
    const decode = verifytoken.verifyToken(token);
    const authorid = decode.userEmail;

    try {
      let {
        title,
        article,
        category,

      } = req.body;
      const getarticle = await this.model().select('*', 'id=$1', [articleId]);
      if (getarticle.length === 0) {
        return res.status(404).send({
          status: 404,
          error: `No article available with id ${articleId}`,
        });
      }
      if (getarticle[0].author_id === authorid) {
        await this.model().update('title=$1', 'id=$2', [title, articleId]);
        await this.model().update('article=$1', 'id=$2', [article, articleId]);
        const update = await this.model().update('category=$1', 'id=$2', [category, articleId]);
        return res.status(200).send({
          status: 200,
          message: 'article successfully edited',
          data: {
            update,
          },
        });
      }
      return res.status(404).send({
        status: 404,
        error: 'you are not  the author of the article',
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
