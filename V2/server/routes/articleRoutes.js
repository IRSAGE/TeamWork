import express from 'express';
import verifyUser from '../middleware/userauth';
import articleController from '../controllers/articlecontroller';
import { validcreateArticle } from '../../../V1/server/middleware/validCreateArticle';

const router = express.Router();
router.post('/', validcreateArticle, verifyUser, articleController.articleController.createArticle);
router.patch('/:articleId', validcreateArticle, verifyUser, articleController.articleController.editArticle);

export default router;
