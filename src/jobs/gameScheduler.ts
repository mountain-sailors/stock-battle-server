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
    task('*/10 * * * *', startGame).start();
    task('*/10 * * * *', endGame).start();
  } catch (e) {
    console.log(e);
  }
};

export default gameScheduler;
