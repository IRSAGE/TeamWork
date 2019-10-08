import express from 'express';
import user_controller from '../controllers/usercontroller';

import { validSignUp, validSignIn } from '../middleware/uservalidator';

const router = express.Router();

router.post('/signup', validSignUp, user_controller.UserController.signUp);
router.post('/signin', validSignIn, user_controller.UserController.signIn);
export default router;
