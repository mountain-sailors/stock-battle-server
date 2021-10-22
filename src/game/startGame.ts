import { Op, Sequelize } from 'sequelize';
import GameStatusType from '../@types/GameStatusType';
import Room from '../models/Room';
import UserStock from '../models/UserStock';

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
