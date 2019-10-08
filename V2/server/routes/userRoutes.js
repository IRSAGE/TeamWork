import express from 'express';
import user_controller from '../controllers/usercontroller';

import validsignUp from '../middleware/uservalidator';


const router = express.Router();

router.post('/signup', validsignUp, user_controller.UserController.signUp);

export default router;
