import express from 'express';
import verifyToken from '../auth/jwt';
import roomRouter from './roomRouter';
import testRouter from './testRouter';
import userRouter from './userRouter';
import stockRouter from './stockRouter';

const router = express.Router();

router.use('/test', testRouter);
router.use('/user', userRouter);
router.use('/stock', verifyToken, stockRouter);
router.use('/room', verifyToken, roomRouter);

export default router;
