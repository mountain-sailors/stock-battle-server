import { QueryTypes } from 'sequelize';
import WinConditionType from '../@types/WinConditionType';
import { calculateProfitRate, calculateTotalProfit } from '../game/calculator';
import getGameData from '../game/gameData';
import sequelize from '../models';
import { currentStockPrices } from '../utils/stocks';
import roomService from './roomService';
import userStockService from './userStockService';

const dateFormatter = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = `0${date.getUTCMonth() + 1}`.slice(-2);
  const day = `0${date.getUTCDate()}`.slice(-2);
  const hours = `0${date.getUTCHours()}`.slice(-2);
  const minutes = `0${date.getUTCMinutes()}`.slice(-2);
  const seconds = `0${date.getUTCSeconds()}`.slice(-2);

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

const getBoardData = (stock: any) => {
  const calculateProfit =
    stock.winCondition === WinConditionType.MAX_PROFIT_RATE ? calculateProfitRate : calculateTotalProfit;

  const profit = calculateProfit(stock.initialPrice, stock.price, stock.amount);

  const data = {
    userId: stock.userId,
    profit,
  };
  return data;
};

const getInitialData = async (roomId: number) => {
  const initialData: Array<any> = [];
  const stocks: any = await getData(roomId);
  const capacity = stocks[0].maxCapacity;
  let idx = 1;
  let data: any = [];
  console.time('init');
  stocks.forEach((stock: any) => {
    data.push(getBoardData(stock));

    if (idx === capacity) {
      initialData.push({
        date: new Date(stock.createdAt),
        data,
      });
      data = [];
      idx = 0;
    }
    idx += 1;
  });
  console.timeEnd('init');
  return initialData;

  // const stocks = await Stock.findAll({
  //   where: {
  //     createdAt: { [Op.gte]: room.startDate },
  //   },
  // });
  // const currentTime = new Date().getTime();
  // let date = currentTime - 1000 * 60 * 100;
  // if (date < new Date(room.startDate).getTime()) {
  //   date = new Date(room.startDate).getTime();
  // }
  // let next = date + 1000 * 60;
  // while (date <= currentTime) {
  //   // eslint-disable-next-line no-loop-func
  //   const tmp = stocks.filter((stock) => next > stock.createdAt.getTime() && date <= stock.createdAt.getTime());
  //   if (tmp.length !== 0) {
  //     const data = getGameData(room, userStocks, stockArrayToObject(tmp));
  //     initialData.push({
  //       date: new Date(date),
  //       data,
  //     });
  //   }
  //   date = next;
  //   next += 1000 * 60;
  // }
  // return initialData;
};

const getCurrentData = async (roomId: number) => {
  const room = await roomService.getRoomById(+roomId);
  const userStocks = await userStockService.getUserStockByRoomId(+roomId);
  const data = getGameData(room!, userStocks, currentStockPrices);
  return [{ date: new Date(), data }];
};

const dashboardService = {
  getData,
  getInitialData,
  getCurrentData,
};

export default dashboardService;
