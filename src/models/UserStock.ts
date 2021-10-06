import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class UserStock extends Model {
  public id!: number;

  public userId!: number;

  public stockId!: number;

  public amount!: number;
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
    stockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
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