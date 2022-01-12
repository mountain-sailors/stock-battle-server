import nodemailer from 'nodemailer';
import { Op } from 'sequelize';
import { logger } from '../config/logger';
import User from '../models/User';
import { generateRandomCode } from '../utils/generateInvitationCode';
import generateVerificationCode from '../utils/generateVerificationCode';

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

const findUsers = async (column: string, value: number[]) => {
  const users = await User.findAll({
    where: {
      [column]: value,
    },
    raw: true,
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

const verifyEmail = async (email: string) => {
  const user = await findUser('email', email, ['id']);
  if (user !== null) return { isEmailExist: true, code: null };
  const code = generateVerificationCode();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PWD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL, // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
    to: email, // 수신 메일 주소
    subject: '주마주마 이메일 인증 코드', // 제목
    text: `Verification Code : ${code}`, // 내용
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      logger.error(error);
    } else {
      logger.info(`Email sent: ${info.response}`);
    }
  });
  return { isEmailExist: false, code };
};

const updatePassword = (email: string, password: string) => {
  User.update(
    { password },
    {
      where: {
        email,
      },
      individualHooks: true,
    },
  );
};

const sendTemporaryPassword = async (email: string) => {
  const user = await findUser('email', email, ['id']);
  if (user === null) return { isEmailExist: false };
  const password = generateRandomCode().slice(0, 10);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PWD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: '주마주마 임시 비밀 번호 발급',
    text: `안녕하세요. 주마주마 입니다.\n\n주마주마를 이용해주셔서 진심으로 감사드립니다.\n\n 회원님의 임시비밀번호는 ${password} 입니다.\n\n로그인 후 반드시 비밀번호를 수정해 주십시오.`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      logger.error(error);
    } else {
      logger.info(`Email sent: ${info.response}`);
    }
  });
  User.update(
    { password },
    {
      where: {
        email,
      },
      individualHooks: true,
    },
  );
  return { isEmailExist: true };
};

const userService = {
  createUser,
  findUser,
  findUsers,
  searchUsers,
  deleteUser,
  verifyEmail,
  updatePassword,
  sendTemporaryPassword,
};

export default userService;
