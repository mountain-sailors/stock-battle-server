import { Sequelize } from 'sequelize';
import Stock from '../models/Stock';

export const stockPriceMap = new Map<string, number>();

export const updateCurrentPrices = async () => {
  // 장의 시작과 끝에 쓸 때, 가장 최근에 불러온 가격이 장의 시가/종가라는 것을 보장할 수 있을 지는 확인해보아야 할 것 같음
  const stocks = await Stock.findAll({
    attributes: ['ticker', 'price', [Sequelize.fn('max', Sequelize.col('createdAt')), 'createdAt']],
    group: ['ticker'],
  });
  stocks.forEach((stock) => stockPriceMap.set(stock.ticker, stock.price));
};
