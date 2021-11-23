import userService from '../services/userService';
import userStockService from '../services/userStockService';

const COLORS = ['#8B74FF', '#FF6E4F', '#54E58E', '#3063ED', '#F178B6'];

const findPlayersInfo = async (roomId: number) => {
  const userStocks = await userStockService.getUserStockByRoomId(+roomId);

  const userIds = userStocks.map((user) => {
    return user.userId;
  });

  const players = await userService.findUsers('id', userIds);
  const playersInfo: object[] = [];
  players.forEach((player, i) => {
    playersInfo.push({
      id: player.id,
      username: player.username,
      avatar: player.avatar,
      color: COLORS[i],
    });
  });
  return playersInfo;
};

const playerService = {
  findPlayersInfo,
};

export default playerService;
