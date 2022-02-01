import { QueryTypes } from 'sequelize';
import sequelize from '../models';

const findGameHistory = async (userId: number) => {
  const history = await sequelize.query(
    `SELECT ugh.id, ugh.isWin, ugh.rank, ugh.profit,
    r.id as roomId, r.winCondition, r.title,  r.startDate, r.endDate,
    us.ticker, us.stockName
    FROM user_game_history AS ugh
    LEFT JOIN room AS r
    ON ugh.roomId=r.id
    LEFT JOIN user_stock AS us
    ON ugh.roomId=us.roomId
    WHERE ugh.userId=${userId} AND us.userId=${userId};`,
    { type: QueryTypes.SELECT },
  );
  return history;
};

const getGameHistory = async (userId: number) => {
  const gameHistory = await findGameHistory(userId);
  let roomIdToString = '';
  const historyLength = gameHistory.length;
  gameHistory.forEach((history: any, i) => {
    if (i === historyLength - 1) {
      roomIdToString += `${history.roomId}`;
    } else {
      roomIdToString += `${history.roomId},`;
    }
  });
  if (roomIdToString.length === 0) throw new Error('NO_RESULT');
  const users = await sequelize.query(
    `SELECT ugh.userId, ugh.roomId, u.username
    FROM stock_battle.user_game_history AS ugh
    JOIN stock_battle.user AS u
    ON u.id=ugh.userId
    WHERE ugh.roomId IN (${roomIdToString});`,
    { type: QueryTypes.SELECT },
  );
  gameHistory.forEach((history: any) => {
    // eslint-disable-next-line no-param-reassign
    history.players = [];
    users.forEach((user: any) => {
      if (history.roomId === user.roomId) {
        history.players.push(user.username);
      }
    });
  });
  return gameHistory;
};

const getGameResult = async (roomId: number) => {
  const gameResult = await sequelize.query(
    `SELECT ugh.userId, ugh.isWin, ugh.rank, ugh.profit,
    us.ticker, us.amount, us.stockName from user_game_history as ugh
    INNER JOIN user_stock as us
    ON ugh.roomId=us.roomId and ugh.userId=us.userId
    WHERE ugh.roomId = ${roomId};`,
    { type: QueryTypes.SELECT },
  );

  return gameResult;
};

const userGameHistoryService = {
  getGameHistory,
  getGameResult,
};

export default userGameHistoryService;
