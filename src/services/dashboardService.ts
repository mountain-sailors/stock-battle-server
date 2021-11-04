import { Op } from 'sequelize';
import getGameData from '../game/gameData';
import Room from '../models/Room';
import Stock from '../models/Stock';
import UserStock from '../models/UserStock';
import { currentStockPrices, stockArrayToObject } from '../utils/stocks';

const getInitialData = async (room: Room, userStocks: Array<UserStock>) => {
  const initialData = [];
  const stocks = await Stock.findAll({
    where: {
      createdAt: { [Op.gte]: room.startDate },
    },
  });

  const currentTime = new Date().getTime();
  let date = new Date(room.startDate).getTime();
  let next = date + 1000 * 60;
  while (date <= currentTime) {
    // eslint-disable-next-line no-loop-func
    const tmp = stocks.filter((stock) => next > stock.createdAt.getTime() && date <= stock.createdAt.getTime());

    if (tmp.length !== 0) {
      const data = getGameData(room, userStocks, stockArrayToObject(tmp));

      initialData.push({
        date: new Date(date),
        data,
      });
    }
    date = next;
    next += 1000 * 60;
  }
  return initialData;
};

const getCurrentData = (room: Room, userStocks: Array<UserStock>) => {
  const data = getGameData(room, userStocks, currentStockPrices);
  return [{ date: new Date(), data }];
};

const dashboardService = {
  getInitialData,
  getCurrentData,
};

export default dashboardService;
