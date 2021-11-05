import Room from '../models/Room';
import UserStock from '../models/UserStock';
import calculateProfits from './calculator';

const getGameData = (room: Room, userStocks: Array<UserStock>, stockPrices: any) => {
  const data: Array<{ userId: number; profit: number; rank: number }> = [];
  const profits = calculateProfits(userStocks, room.winCondition, stockPrices);

  userStocks.forEach((userStock) => {
    const index = profits.findIndex((el) => el.id === userStock.id);
    const { profit } = profits[index];
    const rank = profits.findIndex((el) => el.profit === profit) + 1;

    data.push({
      userId: userStock.userId,
      profit,
      rank,
    });
  });
  return data;
};

export default getGameData;
