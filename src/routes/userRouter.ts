import express from 'express';
import verifyToken from '../auth/jwt';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/', userController.createAccount);
router.post('/login', userController.login);
router.post('/validation', userController.emailValidation);
router.get('/check', verifyToken, userController.check);

export default router;
