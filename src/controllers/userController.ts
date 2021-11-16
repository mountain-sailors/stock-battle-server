import 'dotenv/config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { ValidationError } from 'sequelize';
import StatusCode from '../@types/statusCode';
import { logger } from '../config/logger';
import userService from '../services/userService';

const createAccount = async (req: Request, res: Response) => {
  try {
    const { username, email, password, avatar } = req.body;
    await userService.createUser(username, email, password, avatar);

    return res.status(StatusCode.OK).json('User Created');
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.info(error);
      return res.status(StatusCode.BAD_REQUEST).json();
    }
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    // 아까 local로 등록한 인증과정 실행
    return passport.authenticate('local', { session: false }, (passportErr, user) => {
      // 인증이 실패했거나 유저데이터 없다면 에러
      if (passportErr || !user) {
        logger.info(passportErr);
        return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: 'Login Failed' });
      }
      // user 데이터를 통해 로그인 진행
      req.login(user, { session: false }, (loginErr) => {
        if (loginErr) {
          logger.error(loginErr);
          return res.send(loginErr);
        }

        // 토큰 생성
        const token = jwt.sign(
          { userId: user.id, username: user.username, userEmail: user.email },
          process.env.JWT_SECRET!,
          { expiresIn: '7d' },
        );
        return res.status(StatusCode.OK).json({ success: true, message: 'Login Success', token });
      });
    })(req, res);
  } catch (error) {
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const emailValidation = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await userService.findUser('email', email, ['id']);
    const isEmailExist = user !== null;

    return res.status(StatusCode.OK).json({ isEmailExist });
  } catch (error) {
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const searchUsers = async (req: Request, res: Response) => {
  try {
    const { username } = req.query;
    const users = await userService.searchUsers(<string>username);

    return res.status(StatusCode.OK).json(users);
  } catch (error) {
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const check = (req: Request, res: Response) => {
  res.json(req.decoded);
};

const deleteAccount = (req: Request, res: Response) => {
  try {
    const { userEmail } = req.decoded;
    userService.deleteUser(userEmail);

    return res.status(StatusCode.OK).json();
  } catch (error) {
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const userController = {
  createAccount,
  login,
  emailValidation,
  searchUsers,
  check,
  deleteAccount,
};

export default userController;
