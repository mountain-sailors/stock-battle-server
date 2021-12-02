import 'dotenv/config';
import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';
import { logger } from '../config/logger';
import userGameHistoryService from '../services/userGameHistoryService';

const findGameHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const gameHistory = await userGameHistoryService.getGameHistory(+userId);
    console.log(gameHistory);
    return res.status(StatusCode.OK).json(gameHistory);
  } catch (error: any) {
    if (error.message === 'NO_RESULT') return res.status(StatusCode.OK).json([]);
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const getGameResult = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const gameResult = await userGameHistoryService.getGameResult(+roomId);

    return res.status(StatusCode.OK).json(gameResult);
  } catch (error) {
    console.error(error);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const userGameHistoryController = {
  findGameHistory,
  getGameResult,
};

export default userGameHistoryController;
