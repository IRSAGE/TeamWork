import dotenv from 'dotenv';
// eslint-disable-next-line import/no-unresolved
import ArticleModel from '../model/articleModel';

import verifytoken from '../helpers/tokens';

let authorid;
const articleData = [

];
dotenv.config();

class articleController {
  // create article

  static createArticle = (req, res) => {
    const token = req.header('token');
    const decode = verifytoken.verifyToken(token);

    const articleId = articleData.length + 1;
    authorid = decode.userEmail;
    const createdOn = new Date();

    const newArticle = new ArticleModel(
      articleId,
      authorid,
      req.body.title,
      req.body.article,
      createdOn,
    );

    articleData.push(newArticle);
    return res.status(201).json({
      status: 201,
      message: ' article successfully created',
      data: {
        articleId,
        authorid,
        title: newArticle.title,
        article: newArticle.article,
        createdOn,

      },
    });
  }

  // edit article


  static editArticle = (req, res) => {
    const { articleId } = req.params;
    const findarticle = articleData.find(u => u.id === parseInt(articleId, 10));

    if (!findarticle) {
      return res.status(404).send({
        status: 404,
        error: `No article available with id ${articleId}`,
      });
    }

    findarticle.title = req.body.title;
    findarticle.article = req.body.article;

    return res.status(200).send({
      status: 200,
      message: 'article successfully edited',
      data: {

        articleId,
        title: findarticle.title,
        article: findarticle.article,
      },
    });
  }

  // delete article


   static deleteArticle = (req, res) => {
     const { articleId } = req.params;
     const findarticle = articleData.find(u => u.id === parseInt(articleId, 10));
     if (!findarticle) {
       return res.status(404).send({
         status: 404,
         error: `No article available with id ${articleId}`,
       });
     }
     const index = articleData.indexOf(findarticle);
     articleData.splice(index, 1);

     return res.status(200).send({
       status: 200,
       message: ' article successfully deleted',

     });
   }
}
export default { articleController, articleData };
