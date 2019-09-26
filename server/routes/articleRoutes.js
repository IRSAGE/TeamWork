import express from 'express';
import { verifyUser } from '../middleware/userauth';
import articleController from '../controllers/articlecontroller';
import { validcreateArticle } from '../middleware/validCreateArticle';
import { validCreateArticleComment } from '../middleware/validCreateArticleComment';

const router = express.Router();
router.post('/', validcreateArticle, verifyUser, articleController.articleController.createArticle);
router.patch('/:articleId', validcreateArticle, verifyUser, articleController.articleController.editArticle);
router.delete('/:articleId', verifyUser, articleController.articleController.deleteArticle);
router.post('/:articleId/comments', verifyUser, validCreateArticleComment, articleController.articleController.createcomment);

export default router;
