import express from 'express';
import playerController from '../controllers/playerController';

const router = express.Router();

router.get('/:roomId', playerController.getPlayersInfo);

export default router;
