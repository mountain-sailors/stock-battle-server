import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class Stock extends Model {
  public id!: number;

  public ticker!: string;

  public time!: Date;

  public price!: number;
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'stock',
    createdAt: true,
    updatedAt: false,
  },
);

export default Stock;
