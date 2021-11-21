import express from 'express';
import verifyToken from '../auth/jwt';
import meRouter from './meRouter';
import playerRouter from './playerRouter';
import roomRouter from './roomRouter';
import stockRouter from './stockRouter';
import userGameHistoryRouter from './userGameHistoryRouter';
import userRouter from './userRouter';
import userStockRouter from './userStockRouter';

const router = express.Router();

router.use('/user', userRouter);
router.use('/stock', verifyToken, stockRouter);
router.use('/room', verifyToken, roomRouter);
router.use('/game-history', verifyToken, userGameHistoryRouter);
router.use('/user-stock', verifyToken, userStockRouter);
router.use('/me', verifyToken, meRouter);
router.use('/player', verifyToken, playerRouter);

export default router;
