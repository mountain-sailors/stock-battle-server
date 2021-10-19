import { QueryTypes } from 'sequelize';
import GameStatusType from '../@types/GameStatusType';
import WinConditionType from '../@types/WinConditionType';
import sequelize from '../models';
import Room from '../models/Room';
import UserStock from '../models/UserStock';
import generateInvitationCode from '../utils/generateInvitationCode';

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
  const myRoomList = await sequelize.query(
    `SELECT r.id, r.title, r.startDate, r.endDate, r.gameStatus FROM room as r INNER JOIN user_stock as u ON r.id = u.roomId WHERE u.userId=${userId}`,
    { type: QueryTypes.SELECT },
  );
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

const findRoom = async (column: string, value: string) => {
  const room = await Room.findOne({
    where: {
      [column]: value,
    },
  });
  return room;
};

const roomService = {
  createRoom,
  getMyRoomList,
  enterRoomByInvitation,
  findRoom,
};

export default roomService;
