import { QueryTypes } from 'sequelize';
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
  console.log(myRoomList);
  return myRoomList;
};

const roomService = {
  createRoom,
  getMyRoomList,
  // enterRoomByInvitation,
};

export default roomService;
