import User from '../models/User';

const createUser = (username: string, email: string, password: string, avatar: string) => {
  User.create({
    username,
    email,
    password,
    avatar,
  });
};

const userService = {
  createUser,
};

export default userService;
