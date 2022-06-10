import User from '../models/User';

const getRandomInt = () => {
  return Math.floor(Math.random() * 10);
};

const generateRandomCode = () => {
  let code = '';
  for (let i = 0; i < 8; i += 1) {
    code += getRandomInt();
  }
  return code;
};

const generateUsername = async (): Promise<any> => {
  const username = `익명${generateRandomCode()}`;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (user) {
    return generateUsername();
  }
  return username;
};

export default generateUsername;
