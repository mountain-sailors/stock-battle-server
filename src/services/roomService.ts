import WinConditionType from '../@types/WinConditionType';
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

const roomService = {
  createRoom,
  // getMyRoomList,
  // enterRoomByInvitation,
};

export default roomService;
