import express from 'express';
import authRouter from './authRouter';
import testRouter from './testRouter';

const router = express.Router();

router.use('/test', testRouter);
router.use('/user', authRouter);

export default router;
