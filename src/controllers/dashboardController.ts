import { Request, Response } from 'express';
import { logger } from '../config/logger';
import dashboardService from '../services/dashboardService';
import { stockEvents } from '../utils/stocks';

const getDashboardData = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    res.writeHead(200, {
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
    });

    // Tell the client to retry every 100 seconds if connectivity is lost
    res.write('retry: 100000\n\n');

    // send initial data (all data from start date to now)
    const dashboardData = await dashboardService.getInitialData(+roomId);
    res.write(`data: ${JSON.stringify(dashboardData)}\n\n`);
    logger.info(`SSE initial data sent to room ${roomId}`);

    stockEvents.on('update', async () => {
      const currentData = await dashboardService.getCurrentData(+roomId);
      res.write(`data: ${JSON.stringify(currentData)}\n\n`);
      logger.info(`SSE current data sent to room ${roomId}`);
    });

    req.on('close', () => {
      logger.info('SSE connection closed');
    });
  } catch (err) {
    logger.error(`SSE error: ${err}`);
  }
};

const dashboardController = {
  getDashboardData,
};

export default dashboardController;
