import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class User extends Model {
  public id!: number;

  public username!: string;

  public email!: string;

  public password!: string;

  public point!: number;

  public avatar!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user',
    createdAt: true,
    updatedAt: false,
  },
);

export default User;
