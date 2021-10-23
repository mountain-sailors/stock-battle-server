import express from 'express';
import userGameHistoryController from '../controllers/userGameHistoryController';

const router = express.Router();

router.get('/:userId', userGameHistoryController.findGameHistory);

export default router;
