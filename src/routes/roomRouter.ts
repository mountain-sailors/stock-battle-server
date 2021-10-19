import express from 'express';
import roomController from '../controllers/roomController';

const router = express.Router();

router.post('/', roomController.createRoom);
router.get('/', roomController.getMyRoomList);
router.post('/invitation', roomController.enterRoomByInvitation);

export default router;