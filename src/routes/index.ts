import express from 'express';
import testRouter from './testRouter';
import userRouter from './userRouter';
import stockRouter from './stockRouter';
import verifyToken from '../auth/jwt';

const router = express.Router();

router.use('/test', testRouter);
router.use('/user', userRouter);
router.use('/stock', verifyToken, stockRouter);

export default router;
