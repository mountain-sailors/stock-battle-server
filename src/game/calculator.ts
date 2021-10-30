import WinConditionType from '../@types/WinConditionType';
import UserStock from '../models/UserStock';
import { stockPriceMap } from '../utils/stocks';

const calculateReturnRate = (initialPrice: number, finalPrice: number) => {
  return ((finalPrice - initialPrice) / initialPrice) * 100;
};

const calculateTotalReturn = (initialPrice: number, finalPrice: number, amount: number) => {
  return (finalPrice - initialPrice) * amount;
};

const calculateProfits = (userStocks: Array<UserStock>, winCondition: WinConditionType) => {
  const profits: Array<{ id: number; profit: number }> = [];
  const calculateProfit = winCondition === WinConditionType.TOTAL_RETURN ? calculateTotalReturn : calculateReturnRate;

  userStocks.forEach((userStock) => {
    const profit = calculateProfit(userStock.initialPrice, stockPriceMap.get(userStock.ticker)!, userStock.amount);
    profits.push({ id: userStock.id, profit });
  });

  return profits;
};

export default calculateProfits;
