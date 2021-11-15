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

const userGameHistoryService = {
  getGameHistory,
};

export default userGameHistoryService;
