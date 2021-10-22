import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';

const getMyInfo = (req: Request, res: Response) => {
  try {
    const { username, userEmail } = req.decoded;

    return res.status(StatusCode.OK).json({ username, userEmail });
  } catch (err) {
    return res.status(StatusCode.SERVER_ERROR).json('Error occured');
  }
};

const meController = {
  getMyInfo,
};

export default meController;
