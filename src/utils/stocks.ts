export const currentStockPrices: any = {};
export const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'CVS', 'TSLA', 'AXP', 'UBER'];

export const updateCurrentPrices = async (data: any) => {
  // 장의 시작과 끝에 쓸 때, 가장 최근에 불러온 가격이 장의 시가/종가라는 것을 보장할 수 있을 지는 확인해보아야 할 것 같음
  const prices: Array<any> = data.data;
  // eslint-disable-next-line no-return-assign
  prices.forEach((price, i) => (currentStockPrices[stockSymbols[i]] = price.price));
  console.log(currentStockPrices);
};
