import express from 'express';
import verifyUser from '../middleware/userauth';
import articleController from '../controllers/articlecontroller';
import { validcreateArticle } from '../../../V1/server/middleware/validCreateArticle';

const router = express.Router();
router.post('/articles', validcreateArticle, verifyUser, articleController.articleController.createArticle);
router.patch('/articles/:articleId', validcreateArticle, verifyUser, articleController.articleController.editArticle);
router.get('/articles/:articleId', verifyUser, articleController.articleController.displayArticle);
router.get('/feeds', verifyUser, articleController.articleController.displayArticles);
router.get('/articles', verifyUser, articleController.articleController.displayArticlesbyuseremail);
router.delete('/articles/:articleId', verifyUser, articleController.articleController.deleteArticle);
export default router;
