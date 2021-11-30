import { Op, QueryTypes, Sequelize } from 'sequelize';
import GameStatusType from '../@types/GameStatusType';
import sequelize from '../models';
import Room from '../models/Room';
import UserStock from '../models/UserStock';
import { currentStockPrices } from '../utils/stocks';

const setInitialPrice = async (roomIdList: Array<number>) => {
  const userStocks = await UserStock.findAll({
    where: {
      roomId: roomIdList,
    },
  });
  userStocks.forEach((userStock) => userStock.update({ initialPrice: currentStockPrices[userStock.ticker] }));
};

const startRoom = async (roomIdList: Array<number>, cancelled: Array<number>) => {
  const started = roomIdList.filter((t) => !cancelled.includes(t));
  if (started.length === 0) return;

  await Room.update(
    {
      gameStatus: GameStatusType.IN_PROGRESS,
    },
    {
      where: {
        id: started,
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
  const cancelled2 = await sequelize.query(
    `SELECT us.roomId, COUNT(us.userId), r.maxCapacity
  FROM stock_battle.user_stock AS us
  JOIN stock_battle.room AS r
  ON r.id = us.roomId
  WHERE r.id in (:roomIdList)
  GROUP BY us.roomId
  HAVING COUNT(us.userId) != r.maxCapacity;`,
    {
      type: QueryTypes.SELECT,
      replacements: {
        roomIdList,
      },
    },
  );

  const cancelledRoomIdList = cancelled.map((c) => c.roomId);
  const cancelledRoomIdList2 = cancelled2.map((c: any) => c.roomId);

  const cancel = cancelledRoomIdList.concat(
    cancelledRoomIdList2.filter((el: number) => !cancelledRoomIdList.find((c) => c === el)),
  );

  if (cancel.length === 0) return cancel;
  await Room.update(
    {
      gameStatus: GameStatusType.CANCELLED,
    },
    {
      where: {
        id: cancel,
      },
    },
  );
  return cancel;
};

const startGame = async () => {
  const currentTime = new Date();
  const targets = await Room.findAll({
    attributes: ['id'],
    where: {
      gameStatus: GameStatusType.NOT_STARTED,
      startDate: { [Op.lte]: currentTime },
    },
  });
  if (targets.length === 0) return;

  const targetIdList = targets.map((r) => r.id);
  const cancelled = await cancelRoom(targetIdList);
  startRoom(targetIdList, cancelled);
};

export default startGame;
