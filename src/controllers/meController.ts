import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';
import userService from '../services/userService';

const getMyInfo = async (req: Request, res: Response) => {
  try {
    const { userId, username, userEmail } = req.decoded;
    const userInfo = await userService.findUser('id', userId, ['point', 'avatar']);

    return res
      .status(StatusCode.OK)
      .json({ userId, username, userEmail, point: userInfo?.point, avatar: userInfo?.avatar });
  } catch (err) {
    return res.status(StatusCode.SERVER_ERROR).json('Error occured');
  }
};

const meController = {
  getMyInfo,
};

export default meController;
