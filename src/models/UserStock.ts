import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class UserStock extends Model {
  public id!: number;

  public userId!: number;

  public roomId!: number;

  public ticker!: string;

  public stockName!: string;

  public amount!: number;

  public initialPrice!: number;
}

UserStock.init(
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
    ticker: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    initialPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    stockName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'user_stock',
    createdAt: true,
    updatedAt: false,
  },
);

export default UserStock;
