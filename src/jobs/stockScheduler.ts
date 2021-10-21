import axios from 'axios';
import 'dotenv/config';
import cron from 'node-cron';
import stockService from '../services/stockService';

const apikey = process.env.STOCK_API_KEY;
const url = `https://api.twelvedata.com/complex_data?apikey=${apikey}`;

// symbols - user-stock에서 조회해올 것
// minute, hour, day of month, month, day of week
const task = () =>
  cron.schedule('* 0,1,2,3,4,5,23 * * 1-5', async () => {
    const body = {
      symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'CVS', 'TSLA', 'AXP', 'UBER'],
      intervals: ['1min'],
      methods: ['price'],
    };
    const { data } = await axios.post(url, body);
    const res = await stockService.updateStocks(body.symbols, data as object);
    console.log(res);
  });

const stockScheduler = () => {
  task().start();
};

export default stockScheduler;
