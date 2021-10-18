import { Op } from 'sequelize';
import Stock from '../models/Stock';

const findStocks = async () => {
  const stocks = await Stock.findAll({ raw: true });
  return stocks;
};

const searchStocks = async (value: string) => {
  const stocks = await Stock.findAll({
    where: {
      ticker: {
        [Op.like]: `%${value}%`,
      },
    },
    raw: true,
  });

  return stocks;
};

const updateStocks = async (tickers: string[], prices: object) => {
  const pricesObj = JSON.parse(JSON.stringify(prices));
  const stocks: any[] = [];
  for (let i = 0; i < tickers.length; i += 1) {
    const tmp = {
      ticker: tickers[i],
      price: pricesObj.data[i].price,
    };
    stocks.push(tmp);
  }
  const result = await Stock.bulkCreate(stocks);
  return result;
};

const stockService = {
  findStocks,
  searchStocks,
  updateStocks,
};

export default stockService;
