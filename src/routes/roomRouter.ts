import express from 'express';
import verifyToken from '../auth/jwt';
import roomController from '../controllers/roomController';

const router = express.Router();

router.post('/', verifyToken, roomController.createRoom);
router.get('/', verifyToken, roomController.getMyRoomList);

export default router;
