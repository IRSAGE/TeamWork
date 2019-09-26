import express from 'express';
import { verifyUser } from '../middleware/userauth';
import articleController from '../controllers/articlecontroller';
import { validcreateArticle } from '../middleware/validCreateArticle';

const router = express.Router();
router.post('/', validcreateArticle, verifyUser, articleController.articleController.createArticle);


export default router;
