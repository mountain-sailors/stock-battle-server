import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';
import { logger } from '../config/logger';
import userService from '../services/userService';

const getMyInfo = async (req: Request, res: Response) => {
  try {
    const { userId, username, userEmail } = req.decoded;
    const userInfo = await userService.findUser('id', userId, ['username', 'point', 'avatar']);
    return res
      .status(StatusCode.OK)
      .json({ userId, username: userInfo?.username, userEmail, point: userInfo?.point, avatar: userInfo?.avatar });
  } catch (err) {
    logger.error(err);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const meController = {
  getMyInfo,
};

export default meController;
