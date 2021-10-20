import UserGameHistory from '../models/UserGameHistory';
import roomService from './roomService';

const findGameHistory = async (column: string, value: number, attributes: string[]) => {
  const history = await UserGameHistory.findAll({
    attributes,
    where: {
      [column]: value,
    },
  });
  return history;
};

const getGameHistory = async (id: string) => {
  const userId: string = id.split(':')[1];
  const idValue: number = +userId;

  // req.decoded에서 조회: username
  // { username } = req.decoded;

  // userGameHistory에서 조회: isWin,rank,profit
  // room에서 조회: winCondition,roomTitle
  // userStock에서 조회: ticker
  // roomMember -> 고민중...

  const historyInfo = await findGameHistory('userId', idValue, ['roomId', 'isWin', 'rank', 'profit']);
  console.log('history: ', historyInfo);
  // roomId 는 historyInfo 에서 추출
  const roomId = '1';
  const roomInfo = await roomService.findRoom('roomId', roomId);
  console.log('room: ', roomInfo);
  // userStock ticker은 완성되면 service 에서 조회해오기
  // roomMember 고민
};

const userGameHistoryService = {
  getGameHistory,
};

export default userGameHistoryService;
