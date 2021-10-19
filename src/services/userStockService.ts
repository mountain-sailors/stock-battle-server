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

const userStockService = {
  registerStock,
};

export default userStockService;
