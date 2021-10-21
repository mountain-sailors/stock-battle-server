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

const findUser = async (column: string, value: string) => {
  const user = await User.findOne({
    where: {
      [column]: value,
    },
  });
  return user;
};

const findUsers = async (column: string, value: string) => {
  const users = await User.findAll({
    where: {
      [column]: value,
    },
  });
  return users;
};

const searchUsers = async (value: string) => {
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
  findUser,
  findUsers,
  searchUsers,
};

export default userService;
