import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';
import playerService from '../services/playerService';

const getPlayersInfo = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const playersInfo = await playerService.findPlayersInfo(+roomId);

    return res.status(StatusCode.OK).json(playersInfo);
  } catch (err) {
    return res.status(StatusCode.SERVER_ERROR).json('Error occured');
  }
};

const playerController = {
  getPlayersInfo,
};

export default playerController;
