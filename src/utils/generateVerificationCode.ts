const getRandomInt = () => {
  return Math.floor(Math.random() * 10);
};

const generateVerificationCode = () => {
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += getRandomInt();
  }
  return code;
};

export default generateVerificationCode;
