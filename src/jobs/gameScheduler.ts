import cron from 'node-cron';
import endGame from '../game/endGame';
import startGame from '../game/startGame';

const task = (time: string, func: () => void) =>
  cron.schedule(time, func, {
    scheduled: true,
    timezone: 'UTC',
  });

const gameScheduler = () => {
  try {
    task('30 14 * * 1-5', startGame).start();
    task('0 21 * * 1-5', endGame).start();
  } catch (e) {
    console.log(e);
  }
};

export default gameScheduler;
