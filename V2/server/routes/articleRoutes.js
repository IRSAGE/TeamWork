import express from 'express';
import verifyUser from '../middleware/userauth';
import articleController from '../controllers/articlecontroller';
import commentController from '../controllers/commentcontroller';
import { validcreateArticle } from '../../../V1/server/middleware/validCreateArticle';
import { validCreateArticleComment } from '../../../V1/server/middleware/validCreateArticleComment';

const router = express.Router();
router.post('/articles', validcreateArticle, verifyUser, articleController.articleController.createArticle);
router.post('/articles/:articleId/comments', verifyUser, validCreateArticleComment, commentController.commentController.createcomment);
router.patch('/articles/:articleId', validcreateArticle, verifyUser, articleController.articleController.editArticle);
router.get('/articles/:articleId', verifyUser, articleController.articleController.displayArticle);
router.get('/feeds', verifyUser, articleController.articleController.displayArticles);
router.get('/articles', verifyUser, articleController.articleController.displayArticlesbyuseremail);
router.delete('/articles/:articleId', verifyUser, articleController.articleController.deleteArticle);
export default router;
