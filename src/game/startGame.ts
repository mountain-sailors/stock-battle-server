import { Op, Sequelize } from 'sequelize';
import GameStatusType from '../@types/GameStatusType';
import Room from '../models/Room';
import Stock from '../models/Stock';
import UserStock from '../models/UserStock';

const getInitialPrices = async () => {
  // 가장 최근 가격이 장 시작 가격이라는 것을 보장할 수 있을지는 잘 모르겠음 -> 다음에 체크해보기
  const stocks = await Stock.findAll({
    attributes: ['ticker', 'price', [Sequelize.fn('max', Sequelize.col('createdAt')), 'createdAt']],
    group: ['ticker'],
  });
  const stockMap = new Map<string, number>();
  stocks.forEach((stock) => stockMap.set(stock.ticker, stock.price));
  return stockMap;
};

const setInitialPrice = async (roomIdList: Array<number>) => {
  const stocks = await getInitialPrices();
  console.log(getInitialPrices);
  const userStocks = await UserStock.findAll({
    where: {
      roomId: roomIdList,
    },
  });
  userStocks.forEach((userStock) => userStock.update({ initialPrice: stocks.get(userStock.ticker) }));
};

const startRoom = async (roomIdList: Array<number>, cancelled: Array<number>) => {
  const started = roomIdList.filter((t) => !cancelled.includes(t));
  await Room.update(
    {
      gameStatus: GameStatusType.IN_PROGRESS,
    },
    {
      where: {
        roomId: started,
      },
    },
  );
  setInitialPrice(started);
};

const cancelRoom = async (roomIdList: Array<number>) => {
  const cancelled = await UserStock.findAll({
    attributes: [[Sequelize.fn('distinct', Sequelize.col('roomId')), 'roomId']],
    where: {
      roomId: roomIdList,
      ticker: null,
    },
  });
  const cancelledRoomIdList = cancelled.map((c) => c.id);
  await Room.update(
    {
      gameStatus: GameStatusType.CANCELLED,
    },
    {
      where: {
        roomId: cancelledRoomIdList,
      },
    },
  );
  return cancelledRoomIdList;
};

const startGame = async () => {
  const currentTime = new Date();
  const targets = await Room.findAll({
    attributes: ['Id'],
    where: {
      gameStatus: GameStatusType.NOT_STARTED,
      startDate: { [Op.lte]: currentTime },
    },
  });

  const targetIdList = targets.map((r) => r.id);
  const cancelled = await cancelRoom(targetIdList);
  startRoom(targetIdList, cancelled);
};

export default startGame;
