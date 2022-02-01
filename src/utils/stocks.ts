import EventEmitter from 'events';

export const currentStockPrices: any = {};
export const stockEvents = new EventEmitter();

export const updateCurrentPrices = async (data: any) => {
  data.forEach((elem: any) => (currentStockPrices[elem.market] = elem.trade_price));
  stockEvents.emit('update');
  console.log(currentStockPrices);
};

export const stockArrayToObject = (stocks: Array<any>) => {
  const stockObj: any = {};
  stocks.forEach((stock) => (stockObj[stock.ticker] = stock.price));
  return stockObj;
};
