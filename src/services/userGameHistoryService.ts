import { QueryTypes } from 'sequelize';
import sequelize from '../models';

const findGameHistory = async (userId: number) => {
  const history = await sequelize.query(
    `SELECT ugh.id, ugh.isWin, ugh.rank, ugh.profit,
    r.id as roomId, r.winCondition, r.title,  r.startDate, r.endDate,
    us.ticker
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

  return gameHistory;
};

const getGameResult = async (roomId: number) => {
  const gameResult = await sequelize.query(
    `SELECT ugh.userId, ugh.isWin, ugh.rank, ugh.profit,
    us.ticker, us.amount from user_game_history as ugh
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
