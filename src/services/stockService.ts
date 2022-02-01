import { Op, Sequelize } from 'sequelize';
import Stock from '../models/Stock';

const findStocks = async () => {
  const stocks = await Stock.findAll({
    attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'id'], 'ticker', 'price', 'stockName'],
    group: ['ticker'],
    raw: true,
  });
  return stocks;
};

const searchStocks = async (value: string) => {
  const stocks = await Stock.findAll({
    attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'id'], 'ticker', 'price', 'stockName'],
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

const updateStocks = async (data: any[], dict: any[]) => {
  const stocks: object[] = [];
  for (let i = 0; i < data.length; i += 1) {
    const tmp = {
      ticker: data[i].market,
      price: data[i].trade_price,
      stockName: dict[i].korean_name,
      timestamp: data[i].timestamp,
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
