import express from 'express';
import verifyToken from '../auth/jwt';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/', userController.createAccount);
router.post('/login', userController.login);
router.post('/validation', userController.verifyEmail);
router.get('/search', verifyToken, userController.searchUsers);
router.get('/check', verifyToken, userController.check);
router.delete('/', verifyToken, userController.deleteAccount);

export default router;
