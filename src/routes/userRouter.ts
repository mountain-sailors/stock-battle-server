import express from 'express';
import verifyToken from '../auth/jwt';
import userController from '../controllers/userController';

const router = express.Router();

router.put('/', verifyToken, userController.updateUserinfo);
router.post('/', userController.createAccount);
router.post('/login', userController.login);
router.post('/validation', userController.verifyEmail);
router.post('/username', userController.verifyUsername);
router.get('/search', verifyToken, userController.searchUsers);
router.get('/check', verifyToken, userController.check);
router.delete('/', verifyToken, userController.deleteAccount);
router.put('/password', verifyToken, userController.updatePassword);
router.post('/forgot-password', userController.sendTemporaryPassword);

export default router;
