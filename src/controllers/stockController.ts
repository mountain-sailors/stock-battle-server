import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';
import { logger } from '../config/logger';
import stockService from '../services/stockService';

const getStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await stockService.findStocks();

    return res.status(StatusCode.OK).json(stocks);
  } catch (error) {
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const searchStocks = async (req: Request, res: Response) => {
  try {
    const { ticker } = req.query;
    const stocks = await stockService.searchStocks(<string>ticker);

    return res.status(StatusCode.OK).json(stocks);
  } catch (error) {
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const stockController = {
  getStocks,
  searchStocks,
};

export default stockController;
