import { Op } from 'sequelize';
import GameStatusType from '../@types/GameStatusType';
import WinConditionType from '../@types/WinConditionType';
import Room from '../models/Room';
import UserGameHistory from '../models/UserGameHistory';
import UserStock from '../models/UserStock';
import { updateCurrentPrices } from '../utils/stocks';
import calculateProfits from './calculator';

const getGameResult = (userStocks: Array<UserStock>, winCondition: WinConditionType) => {
  const gameResult: Array<{ userId: number; roomId: number; isWin: boolean; profit: number; rank: number }> = [];
  const profits = calculateProfits(userStocks, winCondition);

  if (winCondition === WinConditionType.FLUCTUATION) profits.sort((a, b) => Math.abs(b.profit) - Math.abs(a.profit));
  else profits.sort((a, b) => b.profit - a.profit);

  userStocks.forEach((userStock) => {
    const index = profits.findIndex((el) => el.id === userStock.id);
    const { profit } = profits[index];
    const rank = profits.findIndex((el) => el.profit === profit) + 1; // 대부분의 경우 index + 1 과 같음. 하지만 같은 등수일 수도 있으므로 따로 처리함 (더 좋은 방법이 있을지 생각해보자)

    gameResult.push({
      userId: userStock.userId,
      roomId: userStock.roomId,
      isWin: rank === 1,
      profit,
      rank,
    });
  });
  return gameResult;
};

const createUserGameHistory = async (roomId: number, winCondition: WinConditionType) => {
  const userStocks = await UserStock.findAll({
    where: {
      roomId,
    },
  });
  const gameResult = getGameResult(userStocks, winCondition);
  UserGameHistory.bulkCreate(gameResult);
};

const endRoom = async (roomList: Array<Room>) => {
  const roomIdList = roomList.map((r) => r.id);
  await Room.update(
    {
      gameStatus: GameStatusType.COMPLETED,
    },
    {
      where: {
        id: roomIdList,
      },
    },
  );
  roomList.forEach((room) => createUserGameHistory(room.id, room.winCondition));
};

const endGame = async () => {
  await updateCurrentPrices();
  const currentTime = new Date();
  const targets = await Room.findAll({
    attributes: ['id'],
    where: {
      gameStatus: GameStatusType.IN_PROGRESS,
      endDate: { [Op.lte]: currentTime },
    },
  });
  if (targets.length === 0) return;
  await endRoom(targets);
};

export default endGame;
