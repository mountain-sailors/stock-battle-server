import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class UserGameHistory extends Model {
  public id!: number;

  public userId!: number;

  public roomId!: number;

  public isWin!: boolean;

  public rank!: number;

  public profit!: number;
}

UserGameHistory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inWin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    profit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user_game_history',
    createdAt: true,
    updatedAt: false,
  },
);

export default UserGameHistory;
