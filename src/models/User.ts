import bcrypt from 'bcrypt';
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
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    hooks: {
      beforeCreate: (user, option) => {
        // eslint-disable-next-line no-param-reassign
        user.password =
          user.password && user.password !== '' ? bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)) : '';
      },
      beforeUpdate: (user, option) => {
        // eslint-disable-next-line no-param-reassign
        user.password =
          user.password && user.password !== '' ? bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)) : '';
      },
    },
  },
);

// User.addHook('beforeCreate', (user, option) => {
//   user.password = user.password && user.password != '' ? bcrypt.hashSync(user.password, 10) : '';
// });

export default User;
