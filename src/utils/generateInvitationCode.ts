import { v4 } from 'uuid';
import Room from '../models/Room';

const generateRandomCode = () => {
  return Buffer.from(v4(), 'utf8').toString('base64');
};

const generateInvitationCode = async (): Promise<any> => {
  const code: string = generateRandomCode();
  const room = await Room.findOne({
    where: {
      invitationCode: code,
    },
  });
  if (room) {
    return generateInvitationCode();
  }
  return code;
};

export { generateInvitationCode, generateRandomCode };
