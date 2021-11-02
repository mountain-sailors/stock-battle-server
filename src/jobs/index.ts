import gameScheduler from './gameScheduler';
import stockScheduler from './stockScheduler';

const initScheduler = () => {
  stockScheduler();
  gameScheduler();
};

export default initScheduler;
