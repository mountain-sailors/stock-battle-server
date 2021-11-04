import Room from '../models/Room';
import UserStock from '../models/UserStock';

const getInitialData = async (room: Room, userStocks: Array<UserStock>) => {
  return [{ date: new Date(), data: { sample: 'data' } }];
};
const getCurrentData = (room: Room, userStocks: Array<UserStock>) => {
  return [{ date: new Date(), data: { sample: 'data' } }];
};

const dashboardService = {
  getInitialData,
  getCurrentData,
};

export default dashboardService;
