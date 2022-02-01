import cron from 'node-cron';
import { logger } from '../config/logger';
import endGame from '../game/endGame';
import startGame from '../game/startGame';

const task = (time: string, func: () => void) =>
  cron.schedule(time, func, {
    scheduled: true,
    timezone: 'UTC',
  });

const gameScheduler = () => {
  try {
    task('* * * * *', startGame).start();
    task('* * * * *', endGame).start();
  } catch (e) {
    logger.error(e);
  }
};

export default gameScheduler;
