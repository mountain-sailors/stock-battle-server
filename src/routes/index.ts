import express from 'express';
import testRouter from './testRouter';
import userRouter from './userRouter';

const router = express.Router();

router.use('/test', testRouter);
router.use('/user', userRouter);

export default router;
