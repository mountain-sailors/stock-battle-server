import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';
import userStockService from '../services/userStockService';

const registerStock = async (req: Request, res: Response) => {
  try {
    const { roomId, ticker, amount } = req.body;
    const { userId } = req.decoded;
    const body = await userStockService.registerStock(roomId, ticker, amount, userId);
    return res.status(StatusCode.OK).json(body);
  } catch (err) {
    console.log(err);
    return res.status(StatusCode.SERVER_ERROR).json('error');
  }
};

const userStockController = {
  registerStock,
};

export default userStockController;
