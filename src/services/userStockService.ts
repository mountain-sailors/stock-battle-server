import { QueryTypes } from 'sequelize';
import sequelize from '../models';
import UserStock from '../models/UserStock';

const registerStock = async (roomId: number, ticker: string, amount: number, userId: number) => {
  await UserStock.update(
    {
      ticker,
      amount,
    },
    {
      where: {
        userId,
        roomId,
      },
    },
  );
};

const getUserStocks = async (roomId: number) => {
  const userStocks = await sequelize.query(
    `SELECT u.id, u.username, us.ticker, us.amount FROM user_stock as us INNER JOIN user as u on us.userId=u.id WHERE roomId=${roomId}`,
    { type: QueryTypes.SELECT },
  );
  return userStocks;
};

const getUserStockByRoomId = async (roomId: number) => {
  const userStocks = await UserStock.findAll({
    where: {
      roomId,
    },
  });
  return userStocks;
};

const userStockService = {
  registerStock,
  getUserStocks,
  getUserStockByRoomId,
};

export default userStockService;
