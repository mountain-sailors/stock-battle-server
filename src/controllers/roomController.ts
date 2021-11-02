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

const enterRoomByInvitation = async (req: Request, res: Response) => {
  try {
    const { invitationCode } = req.body;
    const { userId } = req.decoded;
    await roomService.enterRoomByInvitation(invitationCode, userId);
    return res.status(StatusCode.OK).json();
  } catch (err) {
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const getDashboardData = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
    });
    res.flushHeaders();

    // Tell the client to retry every 100 seconds if connectivity is lost
    res.write('retry: 100000\n\n');

    // 주식개장시간일때만 열려있어야 할텐데
    setInterval(async () => {
      const dashboardData = await roomService.getDashboardData(+roomId);
      res.write(`data: ${dashboardData}\n\n`);
    }, 60000);

    return res.status(StatusCode.OK).json();
  } catch (err) {
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const roomController = {
  createRoom,
  getMyRoomList,
  enterRoomByInvitation,
  getDashboardData,
};

export default roomController;
