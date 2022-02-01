import { QueryTypes } from 'sequelize';
import sequelize from '../models';
import UserStock from '../models/UserStock';

const registerStock = async (roomId: number, ticker: string, amount: number, stockName: string, userId: number) => {
  const userStock = await UserStock.findOne({ where: { userId, roomId } });
  if (!userStock) throw Error('No Such Room');

  userStock.ticker = ticker;
  userStock.amount = amount;
  userStock.stockName = stockName;
  const result = await userStock.save();
  return result;
};

const getUserStocks = async (roomId: number) => {
  const userStocks = await sequelize.query(
    `SELECT u.id, u.username, us.ticker, us.stockName, us.amount FROM user_stock as us INNER JOIN user as u on us.userId=u.id WHERE roomId=${roomId}`,
    { type: QueryTypes.SELECT },
  );
  return userStocks;
};

const getUserStockByRoomId = async (roomId: number) => {
  const userStocks = await UserStock.findAll({
    where: {
      roomId,
    },
    raw: true,
  });
  return userStocks;
};

const userStockService = {
  registerStock,
  getUserStocks,
  getUserStockByRoomId,
};

export default userStockService;
