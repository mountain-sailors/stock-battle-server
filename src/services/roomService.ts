import { QueryTypes } from 'sequelize';
import GameStatusType from '../@types/GameStatusType';
import WinConditionType from '../@types/WinConditionType';
import calculateProfits from '../game/calculator';
import sequelize from '../models';
import Room from '../models/Room';
import UserStock from '../models/UserStock';
import generateInvitationCode from '../utils/generateInvitationCode';
import { currentStockPrices } from '../utils/stocks';
import userGameHistoryService from './userGameHistoryService';
import userStockService from './userStockService';

const createRoom = async (
  title: string,
  maxCapacity: number,
  startDate: Date,
  endDate: Date,
  winConditionString: string,
  userId: number,
) => {
  const winCondition: WinConditionType = WinConditionType[winConditionString as keyof typeof WinConditionType];
  const invitationCode: string = await generateInvitationCode();
  const room = await Room.create({
    title,
    maxCapacity,
    startDate,
    endDate,
    winCondition,
    userId,
    invitationCode,
  });
  const roomId = room.id;
  await UserStock.create({
    userId,
    roomId,
  });
  const body = {
    id: room.id,
    invitationCode,
  };
  return body;
};

const getMyRoomList = async (userId: number) => {
  const roomList: Array<Room> = await sequelize.query(
    `SELECT r.id, r.winCondition, r.title, r.startDate, r.endDate, r.gameStatus FROM room as r INNER JOIN user_stock as u ON r.id = u.roomId WHERE u.userId=${userId}`,
    { type: QueryTypes.SELECT },
  );

  const addRoomInfo = async () => {
    const promises = roomList.map(async (room) => {
      switch (room.gameStatus) {
        case GameStatusType.IN_PROGRESS: {
          const newRoomObj: any = { ...room };
          const userStocks = await userStockService.getUserStockByRoomId(room.id);
          const profits = calculateProfits(userStocks, room.winCondition, currentStockPrices);
          userStocks.forEach((userStock) => {
            if (userStock.userId === userId) {
              const index = profits.findIndex((el) => el.id === userStock.id);
              const { profit } = profits[index];
              newRoomObj.profit = profit;
            }
          });
          return newRoomObj;
        }
        case GameStatusType.COMPLETED: {
          const newRoomObj: any = { ...room };
          const gameHistory = await userGameHistoryService.getGameHistory(userId);
          const myHistory: any = gameHistory.filter((e: any) => e.roomId === room.id);
          newRoomObj.profit = myHistory[0].profit;
          newRoomObj.rank = myHistory[0].rank;
          return newRoomObj;
        }
        default:
          return room;
      }
    });
    const data = await Promise.all(promises);
    return data;
  };
  const myRoomList = addRoomInfo();
  return myRoomList;
};

const enterRoomByInvitation = async (invitationCode: string, userId: number) => {
  const room = await Room.findOne({
    where: {
      invitationCode,
    },
  });
  if (!room) throw new Error('No such room');
  if (room.gameStatus !== GameStatusType.NOT_STARTED) throw new Error('Cannot enter room');
  const capacity = await UserStock.count({
    where: {
      roomId: room.id,
    },
  });
  if (room.maxCapacity === capacity) throw new Error('The room is full');
  UserStock.create({
    userId,
    roomId: room.id,
  });
};

const getRoomById = async (roomId: number) => {
  const room = await Room.findOne({
    where: {
      id: roomId,
    },
  });
  return room;
};

const roomService = {
  createRoom,
  getMyRoomList,
  enterRoomByInvitation,
  getRoomById,
};

export default roomService;
