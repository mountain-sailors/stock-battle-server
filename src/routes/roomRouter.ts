import express from 'express';
import dashboardController from '../controllers/dashboardController';
import roomController from '../controllers/roomController';

const router = express.Router();

router.post('/', roomController.createRoom);
router.get('/', roomController.getMyRoomList);
router.post('/invitation', roomController.enterRoomByInvitation);
router.get('/:roomId', roomController.getRoomById);
router.get('/dashboard/:roomId', dashboardController.getDashboardData);

export default router;
