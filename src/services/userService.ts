import { Op } from 'sequelize';
import User from '../models/User';

const createUser = (username: string, email: string, password: string, avatar: string) => {
  User.create({
    username,
    email,
    password,
    avatar,
  });
};

const findUsers = async (column: string, value: string) => {
  const users = await User.findAll({
    where: {
      [column]: value,
    },
  });
  return users;
};

const searchUsers = async (param: string) => {
  const value = param.split(':')[1];
  const users = await User.findAll({
    attributes: ['id', 'username', 'email', 'point', 'avatar'],
    where: {
      username: {
        [Op.like]: `%${value}%`,
      },
    },
    raw: true,
  });

  return users;
};

const userService = {
  createUser,
  findUsers,
  searchUsers,
};

export default userService;
