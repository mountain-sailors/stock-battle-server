import EventEmitter from 'events';

export const currentStockPrices: any = {};
export const stockSymbols = [
  'AAPL',
  'MSFT',
  'GOOGL',
  'AMZN',
  'CVS',
  'TSLA',
  'AXP',
  'UBER',
  'BTC/USD',
  'ETH/USD',
  'SOL/USD',
  'ADA/USD',
  'BNB/USD',
  '005930', // samsung
  '000660', // sk hynix
  '035420', // naver
  '207940', // samsung biologics
  '051910', // lg chemical
];
export const stockEvents = new EventEmitter();

export const updateCurrentPrices = async (data: any) => {
  // 장의 시작과 끝에 쓸 때, 가장 최근에 불러온 가격이 장의 시가/종가라는 것을 보장할 수 있을 지는 확인해보아야 할 것 같음
  const prices: Array<any> = data.data;
  // eslint-disable-next-line no-return-assign
  prices.forEach((price, i) => (currentStockPrices[stockSymbols[i]] = price.price));
  stockEvents.emit('update');
  console.log(currentStockPrices);
};

export const stockArrayToObject = (stocks: Array<any>) => {
  const stockObj: any = {};
  // eslint-disable-next-line no-return-assign
  stocks.forEach((stock) => (stockObj[stock.ticker] = stock.price));
  return stockObj;
};
