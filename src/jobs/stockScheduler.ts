import axios from 'axios';
import 'dotenv/config';
import cron from 'node-cron';
import stockService from '../services/stockService';
import { stockSymbols, updateCurrentPrices } from '../utils/stocks';

const apikey = process.env.STOCK_API_KEY;
const url = `https://api.twelvedata.com/complex_data?apikey=${apikey}`;

// symbols - user-stock에서 조회해올 것
// minute, hour, day of month, month, day of week
// '*/5 14,15,16,17,18,19,20 * * 1-5'
const task = () =>
  cron.schedule(
    '* * * * *',
    async () => {
      const body = {
        symbols: stockSymbols,
        intervals: ['1min'],
        methods: ['price'],
      };
      const { data } = await axios.post(url, body);
      updateCurrentPrices(data);
      stockService.updateStocks(body.symbols, data as object);
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
