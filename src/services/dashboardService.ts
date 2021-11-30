import { Op, QueryTypes } from 'sequelize';
import getGameData from '../game/gameData';
import sequelize from '../models';
import Room from '../models/Room';
import Stock from '../models/Stock';
import UserStock from '../models/UserStock';
import { currentStockPrices, stockArrayToObject } from '../utils/stocks';

const dateFormatter = (date: Date) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  const dateString = `"${year}-${month}-${day} ${hours}:${minutes}:${seconds}"`;

  return dateString;
};

const getData = async (roomId: number) => {
  const now = new Date();
  const currentTime = dateFormatter(now);
  const startTime = dateFormatter(new Date(new Date().setMinutes(now.getMinutes() - 100)));

  const data = await sequelize.query(
    `SELECT s.ticker, s.price, s.createdAt,
    us.userId, us.roomId, us.amount, us.initialPrice,
    r.winCondition, r.maxCapacity
    FROM stock_battle.stock AS s
    JOIN stock_battle.user_stock AS us
    ON us.ticker = s.ticker
    JOIN stock_battle.room AS r
    ON us.roomId = r.id
    WHERE s.createdAt between ${startTime} and ${currentTime}
    AND us.roomId=${roomId} AND r.id=${roomId};`,
    { type: QueryTypes.SELECT },
  );
  return data;
};

const getInitialData = async (room: Room, userStocks: Array<UserStock>) => {
  const initialData = [];
  const stocks = await Stock.findAll({
    where: {
      createdAt: { [Op.gte]: room.startDate },
    },
  });
  const currentTime = new Date().getTime();

  let date = currentTime - 1000 * 60 * 100;
  if (date < new Date(room.startDate).getTime()) {
    date = new Date(room.startDate).getTime();
  }
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
  getData,
  getInitialData,
  getCurrentData,
};

export default dashboardService;
