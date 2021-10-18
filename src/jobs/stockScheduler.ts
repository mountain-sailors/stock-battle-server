import axios from 'axios';
import 'dotenv/config';
import cron from 'node-cron';
import stockService from '../services/stockService';

const apikey = process.env.STOCK_API_KEY;
const url = `https://api.twelvedata.com/complex_data?apikey=${apikey}`;

const stockScheduler = () => {
  cron.schedule('* * * * *', async () => {
    const body = {
      symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'CVS', 'TSLA', 'AXP', 'UBER'],
      intervals: ['1min'],
      methods: ['price'],
    };
    const { data } = await axios.post(url, body);
    const res = await stockService.updateStocks(body.symbols, data as object);
    console.log(res);
  });
};

export default stockScheduler;
