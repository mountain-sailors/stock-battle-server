import express from 'express';
import stockController from '../controllers/stockController';

const router = express.Router();

router.get('/', stockController.getStocks);
router.get('/search', stockController.searchStocks);

export default router;
