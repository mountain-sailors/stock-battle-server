import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';
import roomService from '../services/roomService';

const createRoom = async (req: Request, res: Response) => {
  try {
    const { title, maxCapacity, startDate, endDate, winCondition } = req.body;
    const { userId } = req.decoded;
    const body = await roomService.createRoom(title, maxCapacity, startDate, endDate, winCondition, userId);
    return res.status(StatusCode.OK).json(body);
  } catch (err) {
    console.log(err);
    return res.status(StatusCode.SERVER_ERROR).json('error');
  }
};

const getMyRoomList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.decoded;
    const body = await roomService.getMyRoomList(userId);
    return res.status(StatusCode.OK).json(body);
  } catch (err) {
    console.log(err);
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const roomController = {
  createRoom,
  getMyRoomList,
  // enterRoomByInvitation,
};

export default roomController;
