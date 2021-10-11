import express from 'express';
import verifyToken from '../auth/jwt';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/', authController.createAccount);
router.post('/login', authController.login);
router.get('/check', verifyToken, authController.check);

export default router;
