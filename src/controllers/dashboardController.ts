import { Request, Response } from 'express';
import dashboardService from '../services/dashboardService';
import roomService from '../services/roomService';
import userService from '../services/userService';
import userStockService from '../services/userStockService';
import { stockEvents } from '../utils/stocks';

const getDashboardData = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const room = await roomService.getRoomById(+roomId);
    const userStocks = await userStockService.getUserStockByRoomId(+roomId);

    const userIds = userStocks.map((user) => {
      return user.userId;
    });

    const players = await userService.findUsers('id', userIds);
    const playersInfo: object[] = [];
    players.forEach((player) => {
      playersInfo.push({
        id: player.id,
        username: player.username,
        avatar: player.avatar,
      });
    });

    res.writeHead(200, {
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
    });

    // Tell the client to retry every 100 seconds if connectivity is lost
    res.write('retry: 100000\n\n');

    // send players information
    res.write(`data: ${JSON.stringify(playersInfo)}\n\n`);

    // send initial data (all data from start date to now)
    const dashboardData = await dashboardService.getInitialData(room!, userStocks);
    res.write(`data: ${JSON.stringify(dashboardData)}\n\n`);

    stockEvents.on('update', () => {
      const currentData = dashboardService.getCurrentData(room!, userStocks);
      res.write(`data: ${JSON.stringify(currentData)}\n\n`);
    });

    req.on('close', () => {
      console.log('sse connection closed');
    });
  } catch (err) {
    console.log(`sse error: ${err}`);
  }
};

const dashboardController = {
  getDashboardData,
};

export default dashboardController;
