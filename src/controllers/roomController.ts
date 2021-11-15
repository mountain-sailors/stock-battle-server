import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';
import roomService from '../services/roomService';

const createRoom = async (req: Request, res: Response) => {
  try {
    const { title, maxCapacity, startDate, endDate, winCondition } = req.body;
    if (!title || !maxCapacity || !startDate || !endDate || !winCondition) {
      return res.status(StatusCode.CLIENT_ERROR).json('Invalid Input');
    }
    const { userId } = req.decoded;
    if (!userId) {
      return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
    }
    const body = await roomService.createRoom(title, maxCapacity, startDate, endDate, winCondition, userId);
    return res.status(StatusCode.OK).json(body);
  } catch (err) {
    console.log(err);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const getMyRoomList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.decoded;
    if (!userId) {
      return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
    }
    const body = await roomService.getMyRoomList(userId);
    return res.status(StatusCode.OK).json(body);
  } catch (err) {
    console.log(err);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const enterRoomByInvitation = async (req: Request, res: Response) => {
  try {
    const { invitationCode } = req.body;
    if (!invitationCode) {
      return res.status(StatusCode.CLIENT_ERROR).json('Invalid Input');
    }
    const { userId } = req.decoded;
    if (!userId) {
      return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
    }
    await roomService.enterRoomByInvitation(invitationCode, userId);
    return res.status(StatusCode.OK).json('Success');
  } catch (err: any) {
    switch (err.message) {
      case 'NOT_EXIST':
        return res.status(404).json('ROOM DOES NOT EXIST');
      case 'FULL_ROOM':
        return res.status(403).json('ROOM IS FULL');
      case 'NOT_STARTED':
        return res.status(410).json('GAME IS NOT STARTED');
      default:
        return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
    }
  }
};

const roomController = {
  createRoom,
  getMyRoomList,
  enterRoomByInvitation,
};

export default roomController;
