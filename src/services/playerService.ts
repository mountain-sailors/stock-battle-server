import userService from '../services/userService';
import userStockService from '../services/userStockService';

const findPlayersInfo = async (roomId: number) => {
  const userStocks = await userStockService.getUserStockByRoomId(+roomId);

  const userIds = userStocks.map((user) => {
    return user.userId;
  });

  const players = await userService.findUsers('id', userIds);
  const playersInfo: object[] = [];
  players.forEach((player) => {
    playersInfo.push({
      id: player.id,
      username: player.username,
      avatar: player.avatar,
    });
  });
  return playersInfo;
};

const playerService = {
  findPlayersInfo,
};

export default playerService;
