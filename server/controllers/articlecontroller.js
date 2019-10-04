import dotenv from 'dotenv';
// eslint-disable-next-line import/no-unresolved
import ArticleModel from '../model/articleModel';
import CommentModel from '../model/commentsModel';

import verifytoken from '../helpers/tokens';

let authorid;
const comments = [

];
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
      req.body.category,
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
        category: newArticle.category,
        createdOn,

      },
    });
  }

  // edit article
  static editArticle = (req, res) => {
    const token = req.header('token');
    const decode = verifytoken.verifyToken(token);
    const { articleId } = req.params;
    if (isNaN(articleId)) {
      return res.status(400).send({
        status: 400,
        error: 'article Id should be an integer',
      });
    }
    const findarticle = articleData.find(u => u.id === parseInt(articleId, 10));
    const finduser = articleData.find(u => (u.id === parseInt(articleId, 10)
    && (u.authorid === decode.userEmail)));
    if (!findarticle) {
      return res.status(404).send({
        status: 404,
        error: `No article available with id ${articleId}`,
      });
    }
    if (finduser) {
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
    return res.status(404).send({
      status: 404,
      message: 'you are not  the author of the article',
    });
  }

  // delete article


   static deleteArticle = (req, res) => {
     const token = req.header('token');
     const decode = verifytoken.verifyToken(token);
     const { articleId } = req.params;
     if (isNaN(articleId)) {
       return res.status(400).send({
         status: 400,
         error: 'article Id should be an integer',
       });
     }
     const findarticle = articleData.find(u => u.id === parseInt(articleId, 10));
     const finduser = articleData.find(u => (u.id === parseInt(articleId, 10)
    && (u.authorid === decode.userEmail)));
     if (!findarticle) {
       return res.status(404).send({
         status: 404,
         error: `No article available with id ${articleId}`,
       });
     }
     if (finduser) {
       const index = articleData.indexOf(findarticle);
       articleData.splice(index, 1);

       return res.status(200).send({
         status: 200,
         message: ' article successfully deleted',

       });
     }
     return res.status(404).send({
       status: 404,
       message: 'you are not  the author of the article',
     });
   }

   // create comment


  static createcomment = (req, res) => {
    const { articleId } = req.params;
    if (isNaN(articleId)) {
      return res.status(400).send({
        status: 400,
        error: 'article Id should be an integer',
      });
    }
    const commentId = comments.length + 1;
    const { comment } = req.body;
    const findarticle = articleData.find(u => u.id === parseInt(articleId, 10));

    if (!findarticle) {
      return res.status(404).send({
        status: 404,
        error: `No article available with id ${articleId}`,
      });
    }

    const newComment = new CommentModel(
      commentId,
      articleId,
      authorid,
      comment,
    );


    comments.push(newComment);

    return res.status(201).send({
      status: 201,
      message: 'comment successfully added',
      data: {
        commentId,
        articleId,
        comment,
      },

    });
  }

  // display article by id
  static displayArticle = (req, res) => {
    const { articleId } = req.params;
    if (isNaN(articleId)) {
      return res.status(400).send({
        status: 400,
        error: 'article Id should be an integer',
      });
    }
    const findarticle = articleData.find(u => u.id === parseInt(articleId, 10));
    const comment = comments.filter(a => a.articleid === articleId);
    if (!findarticle) {
      return res.status(404).send({
        status: 404,
        error: `No article available with id ${articleId}`,
      });
    }
    return res.status(200).send({
      status: 200,
      data: findarticle,
      comment,
    });
  }

// display article by category
static displayCategory = (req, res) => {
  const { category } = req.params;
  if (!isNaN(category)) {
    return res.status(400).send({
      status: 400,
      error: 'article category should  be a string',
    });
  }
  const findarticles = articleData.filter(u => u.category === category);
  if (findarticles.length === 0) {
    return res.status(404).send({
      status: 404,
      error: 'No article available in that category',
    });
  }
  return res.status(200).send({
    status: 200,
    data: findarticles,
  });
}

  // dispaly articles
  static displayArticles = (req, res) => {
    const articles = articleData.sort((a, b) => (new Date(b.createdon)).getTime()
    - (new Date(a.createdon)).getTime());
    return res.status(200).send({
      status: 200,
      data: articles,

    });
  }

  // view all articles created by a user
  static displayArticlesbyuseremail = (req, res) => {
    const token = req.header('token');
    const decode = verifytoken.verifyToken(token);
    const useriD = decode.userEmail;

    const findarticles = articleData.filter(u => u.authorid === useriD);
    if (findarticles.length === 0) {
      return res.status(404).send({
        status: 404,
        error: `No articles  available for ${useriD}`,
      });
    }
    return res.status(200).send({
      status: 200,
      data: findarticles,
    });
  }
}
export default { articleController, articleData };
