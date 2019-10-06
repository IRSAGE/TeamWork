import dotenv from 'dotenv';
// eslint-disable-next-line import/no-unresolved
import ArticleModel from '../model/articleModel';
import CommentModel from '../model/commentsModel';
import Helper from '../helpers/statusreturn';
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
      return Helper.returnresponse(res, 400, 'article Id should be an integer');
    }
    const findarticle = articleData.find(u => u.id === parseInt(articleId, 10));
    const finduser = articleData.find(u => (u.id === parseInt(articleId, 10)
    && (u.authorid === decode.userEmail)));
    if (!findarticle) {
      return Helper.returnresponse(res, 404, `No article available with id ${articleId}`);
    }
    if (finduser) {
      findarticle.title = req.body.title;
      findarticle.article = req.body.article;
      const data = {
        articleId,
        title: findarticle.title,
        article: findarticle.article,
      };
      return Helper.returnresponse(res, 200, 'article successfully edited', data);
    }
    return Helper.returnresponse(res, 404, 'you are not  the author of the article');
  }

  // delete article


   static deleteArticle = (req, res) => {
     const token = req.header('token');
     const decode = verifytoken.verifyToken(token);
     const { articleId } = req.params;
     if (isNaN(articleId)) {
       return Helper.returnresponse(res, 400, 'article Id should be an integer');
     }
     const findarticle = articleData.find(u => u.id === parseInt(articleId, 10));
     const finduser = articleData.find(u => (u.id === parseInt(articleId, 10)
    && (u.authorid === decode.userEmail)));
     if (!findarticle) {
       return Helper.returnresponse(res, 404, `No article available with id ${articleId}`);
     }
     if (finduser) {
       const index = articleData.indexOf(findarticle);
       articleData.splice(index, 1);

       return Helper.returnresponse(res, 200, ' article successfully deleted');
     }
     return Helper.returnresponse(res, 404, 'you are not  the author of the article');
   }

   // create comment


  static createcomment = (req, res) => {
    const { articleId } = req.params;
    if (isNaN(articleId)) {
      return Helper.returnresponse(res, 400, 'article Id should be an integer');
    }
    const commentId = comments.length + 1;
    const { comment } = req.body;
    const findarticle = articleData.find(u => u.id === parseInt(articleId, 10));

    if (!findarticle) {
      return Helper.returnresponse(res, 404, `No article available with id ${articleId}`);
    }

    const newComment = new CommentModel(
      commentId,
      articleId,
      authorid,
      comment,
    );


    comments.push(newComment);
    const data = {
      commentId,
      articleId,
      comment,
    };
    return Helper.returnresponse(res, 201, 'comment successfully added', data);
  }

  // display article by id
  static displayArticle = (req, res) => {
    const { articleId } = req.params;
    if (isNaN(articleId)) {
      return Helper.returnresponse(res, 400, 'article Id should be an integer');
    }
    const findarticle = articleData.find(u => u.id === parseInt(articleId, 10));
    const comment = comments.filter(a => a.articleid === articleId);
    if (!findarticle) {
      return Helper.returnresponse(res, 404, `No article available with id ${articleId}`);
    }
    const data = {
      findarticle,
      comment,
    };
    return Helper.returnresponse(res, 200, 'article with id ', data);
  }

// display article by category
static displayCategory = (req, res) => {
  const { category } = req.params;
  if (!isNaN(category)) {
    return Helper.returnresponse(res, 400, 'article category should  be a string');
  }
  const findarticles = articleData.filter(u => u.category === category);
  if (findarticles.length === 0) {
    return Helper.returnresponse(res, 404, 'No article available in that category');
  }
  return Helper.returnresponse(res, 200, 'all articles found', findarticles);
}

  // dispaly articles
  static displayArticles = (req, res) => {
    const articles = articleData.sort((a, b) => (new Date(b.createdon)).getTime()
    - (new Date(a.createdon)).getTime());
    return Helper.returnresponse(res, 200, 'all articles found', articles);
  }

  // view all articles created by a user
  static displayArticlesbyuseremail = (req, res) => {
    const { authorId } = req.params;
    if (!isNaN(authorId)) {
      return Helper.returnresponse(res, 400, 'authorId should be a string');
    }
    const findarticles = articleData.filter(u => u.authorid === authorId);
    if (findarticles.length === 0) {
      return Helper.returnresponse(res, 404, `No articles  available for ${authorId}`);
    }
    return Helper.returnresponse(res, 200, 'Here are all articles  made by you', findarticles);
  }
}
export default { articleController, articleData };
