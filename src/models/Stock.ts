import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class Stock extends Model {
  public id!: number;

  public ticker!: string;

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
    price: {
      type: DataTypes.DECIMAL(10, 2),
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
