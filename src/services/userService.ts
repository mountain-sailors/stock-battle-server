import User from '../models/User';

const createUser = (username: string, email: string, password: string, avatar: string) => {
  User.create({
    username,
    email,
    password,
    avatar,
  });
};

const isUserExist = async (email: string) => {
  const users = await User.findAll({
    where: {
      email,
    },
  });
  return users.every((user) => user instanceof User);
};

const userService = {
  createUser,
  isUserExist,
};

export default userService;
