import WinConditionType from '../@types/WinConditionType';
import UserStock from '../models/UserStock';

const calculateProfitRate = (initialPrice: number, finalPrice: number) => {
  return ((finalPrice - initialPrice) / initialPrice) * 100;
};

const calculateTotalProfit = (initialPrice: number, finalPrice: number, amount: number) => {
  return (finalPrice - initialPrice) * amount;
};

const calculateProfits = (userStocks: Array<UserStock>, winCondition: WinConditionType, stockPrices: any) => {
  const profits: Array<{ id: number; profit: number }> = [];
  const calculateProfit =
    winCondition === WinConditionType.MAX_PROFIT_RATE ? calculateProfitRate : calculateTotalProfit;

  userStocks.forEach((userStock) => {
    const profit = calculateProfit(userStock.initialPrice, stockPrices[userStock.ticker]!, userStock.amount);
    profits.push({ id: userStock.id, profit });

    if (winCondition === WinConditionType.MAX_FLUCTUATION)
      profits.sort((a, b) => Math.abs(b.profit) - Math.abs(a.profit));
    else profits.sort((a, b) => b.profit - a.profit);
  });

  return profits;
};

export { calculateProfits, calculateProfitRate, calculateTotalProfit };
