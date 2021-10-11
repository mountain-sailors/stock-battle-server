import { DataTypes, Model } from 'sequelize';
import GameStatusType from '../@types/GameStatusType';
import WinConditionType from '../@types/WinConditionType';
import sequelize from './index';

class Room extends Model {
  public id!: number;

  public title!: string;

  public maxCapacity!: number;

  public startDate!: Date;

  public endDate!: Date;

  public winCondition!: WinConditionType;

  public invitationCode!: string;

  public gameStatus!: GameStatusType;

  public ownerId!: number;

  public userStocks!: Array<number>;
}

Room.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    winCondition: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invitationCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gameStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userStocks: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'room',
    createdAt: true,
    updatedAt: false,
  },
);

export default Room;
