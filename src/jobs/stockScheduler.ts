import axios from 'axios';
import 'dotenv/config';
import cron from 'node-cron';
import stockService from '../services/stockService';
import { updateCurrentPrices } from '../utils/stocks';

const findCoinMarket = async () => {
  const coinMarketURL = 'https://api.upbit.com/v1/market/all?isDetails=false';
  const { data } = await axios.get(coinMarketURL);
  return data;
};

const task = () =>
  cron.schedule(
    '* * * * *',
    async () => {
      const coinMarket = (await findCoinMarket()) as any;
      const filteredCoin = coinMarket.filter((elem: any) => elem.market.includes('KRW'));
      let oneLineCoin = '';
      filteredCoin.forEach((e: any) => {
        if (oneLineCoin.length === 0) {
          oneLineCoin += e.market;
        } else {
          oneLineCoin += `,${e.market}`;
        }
      });

      const url = `https://api.upbit.com/v1/ticker?markets=${oneLineCoin}`;
      const { data } = await axios.get(url);
      updateCurrentPrices(data);
      stockService.updateStocks(data as [], filteredCoin);
    },
    {
      scheduled: true,
      timezone: 'UTC',
    },
  );

const stockScheduler = () => {
  task().start();
};

export default stockScheduler;
