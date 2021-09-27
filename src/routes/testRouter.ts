import express from 'express';
import testController from '../controllers/testController';

const router = express.Router();

router.post('/', testController.test);

export default router;
