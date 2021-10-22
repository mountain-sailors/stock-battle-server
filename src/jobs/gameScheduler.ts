import cron from 'node-cron';
import startGame from '../game/startGame';

const task = (time: string, func: () => void) =>
  cron.schedule(time, func, {
    scheduled: true,
    timezone: 'UTC',
  });

const gameScheduler = () => {
  task('30 14 * * 1-5', startGame).start();
  // task('0 21* * 1-5',  endGame).start();
};

export default gameScheduler;
