import { Op } from 'sequelize';
import User from '../models/User';

const createUser = async (username: string, email: string, password: string, avatar: string) => {
  await User.create({
    username,
    email,
    password,
    avatar,
  });
};

const findUser = async (column: string, value: string, attributes: string[]) => {
  const user = await User.findOne({
    attributes,
    where: {
      [column]: value,
    },
    raw: true,
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

const deleteUser = (email: string) => {
  User.destroy({
    where: {
      email,
    },
  });
};

const userService = {
  createUser,
  findUser,
  findUsers,
  searchUsers,
  deleteUser,
};

export default userService;
