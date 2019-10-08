import express from 'express';
import user_controller from '../controllers/usercontroller';

import { validsignUp, validsignin } from '../middleware/uservalidator';

const router = express.Router();

router.post('/signup', validsignUp, user_controller.UserController.signUp);
router.post('/signin', validsignin, user_controller.UserController.signIn);
export default router;
