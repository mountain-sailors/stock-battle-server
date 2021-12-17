import nodemailer from 'nodemailer';
import { Op } from 'sequelize';
import { logger } from '../config/logger';
import User from '../models/User';
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
  if (user !== null) return { isValidEmail: false, code: null };
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
  return { isValidEmail: false, code };
};

const userService = {
  createUser,
  findUser,
  findUsers,
  searchUsers,
  deleteUser,
  verifyEmail,
};

export default userService;
