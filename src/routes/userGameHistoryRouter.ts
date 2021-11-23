import express from 'express';
import userGameHistoryController from '../controllers/userGameHistoryController';

const router = express.Router();

router.get('/:userId', userGameHistoryController.findGameHistory);
router.get('/room/:roomId', userGameHistoryController.getGameResult);

export default router;
