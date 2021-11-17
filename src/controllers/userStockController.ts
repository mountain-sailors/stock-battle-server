import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';
import { logger } from '../config/logger';
import userStockService from '../services/userStockService';

const registerStock = async (req: Request, res: Response) => {
  try {
    const { roomId, ticker, amount } = req.body;
    if (!roomId || !ticker || !amount) return res.status(StatusCode.BAD_REQUEST).json('Invalid Input');
    const { userId } = req.decoded;
    if (!userId) return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
    const body = await userStockService.registerStock(roomId, ticker, amount, userId);
    return res.status(StatusCode.OK).json(body);
  } catch (err: any) {
    logger.error(err);
    if (err.message === 'No Such Room') return res.status(StatusCode.BAD_REQUEST).json('Invalid Input');
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const getUserStocks = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const body = await userStockService.getUserStocks(+roomId);
    if (body.length === 0) return res.status(StatusCode.BAD_REQUEST).json('Invalid Input');
    return res.status(StatusCode.OK).json(body);
  } catch (err) {
    logger.error(err);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const userStockController = {
  registerStock,
  getUserStocks,
};

export default userStockController;
