import express from 'express';
import verifyToken from '../auth/jwt';
import roomRouter from './roomRouter';
import testRouter from './testRouter';
import userRouter from './userRouter';
import userStockRouter from './userStockRouter';

const router = express.Router();

router.use('/test', testRouter);
router.use('/user', userRouter);
router.use('/room', verifyToken, roomRouter);
router.use('/user-stock', verifyToken, userStockRouter);

export default router;
