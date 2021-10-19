import express from 'express';
import userStockController from '../controllers/userStockController';

const router = express.Router();

router.post('/', userStockController.registerStock);

export default router;
