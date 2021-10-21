import { Op, Sequelize } from 'sequelize';
import Stock from '../models/Stock';

const findStocks = async () => {
  const stocks = await Stock.findAll({
    attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'id'], 'ticker', 'price'],
    group: ['ticker'],
    raw: true,
  });
  return stocks;
};

const searchStocks = async (value: string) => {
  const stocks = await Stock.findAll({
    attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'id'], 'ticker', 'price'],
    where: {
      ticker: {
        [Op.like]: `%${value}%`,
      },
    },
    group: ['ticker'],
    raw: true,
  });

  return stocks;
};

const updateStocks = async (tickers: string[], prices: any) => {
  const stocks: object[] = [];
  for (let i = 0; i < tickers.length; i += 1) {
    const tmp = {
      ticker: tickers[i],
      price: prices.data[i].price,
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
