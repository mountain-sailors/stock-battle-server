import { QueryTypes } from 'sequelize';
import sequelize from '../models';

const findGameHistory = async (userId: number) => {
  const history = await sequelize.query(
    `SELECT ugh.id, ugh.isWin, ugh.rank, ugh.profit,
    r.winCondition, r.title,  r.startDate, r.endDate,
    us.ticker
    FROM user_game_history AS ugh
    LEFT JOIN room AS r
    ON ugh.roomId=r.id
    LEFT JOIN user_stock AS us
    ON ugh.roomId=us.roomId
    WHERE us.userId=${userId};`,
    { type: QueryTypes.SELECT },
  );
  return history;
};

const getGameHistory = async (id: string) => {
  const userId: string = id.split(':')[1];
  const idValue: number = +userId;

  const gameHistory = await findGameHistory(idValue);

  return gameHistory;
};

const userGameHistoryService = {
  getGameHistory,
};

export default userGameHistoryService;
