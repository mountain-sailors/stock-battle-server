import express from 'express';
import roomRouter from './roomRouter';
import testRouter from './testRouter';
import userRouter from './userRouter';

const router = express.Router();

router.use('/test', testRouter);
router.use('/user', userRouter);
router.use('/room', roomRouter);

export default router;
