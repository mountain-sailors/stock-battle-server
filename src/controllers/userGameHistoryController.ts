import 'dotenv/config';
import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';
import userGameHistoryService from '../services/userGameHistoryService';

const findGameHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const gameHistory = await userGameHistoryService.getGameHistory(+userId);

    return res.status(StatusCode.OK).json(gameHistory);
  } catch (error) {
    console.error(error);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const userGameHistoryController = {
  findGameHistory,
};

export default userGameHistoryController;
