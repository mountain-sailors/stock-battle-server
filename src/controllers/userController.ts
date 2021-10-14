import 'dotenv/config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import StatusCode from '../@types/statusCode';
import userService from '../services/userService';

const createAccount = (req: Request, res: Response) => {
  try {
    const { username, email, password, avatar } = req.body;
    userService.createUser(username, email, password, avatar);

    return res.status(StatusCode.OK).json('User Created');
  } catch (error) {
    console.error(error);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const login = async (req: Request, res: Response) => {
  try {
    // 아까 local로 등록한 인증과정 실행
    return passport.authenticate('local', { session: false }, (passportErr, user) => {
      // 인증이 실패했거나 유저데이터 없다면 에러
      if (passportErr || !user) {
        console.error(passportErr);
        return res.status(StatusCode.CLIENT_ERROR).json({ success: false, message: 'Login Failed' });
      }
      // user 데이터를 통해 로그인 진행
      req.login(user, { session: false }, (loginErr) => {
        if (loginErr) {
          console.log(loginErr);
          return res.send(loginErr);
        }

        // 토큰 생성
        const token = jwt.sign({ userEmail: user.email }, process.env.JWT_SECRET!, { expiresIn: '7d' });
        return res.status(StatusCode.OK).json({ success: true, message: 'Login Success', token });
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const emailValidation = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await userService.findUser('email', email);
    const isEmailExist = user !== null;

    return res.status(StatusCode.OK).json({ isEmailExist });
  } catch (error) {
    console.error(error);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const searchUsers = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const users = await userService.searchUsers(username);

    return res.status(StatusCode.OK).json(users);
  } catch (error) {
    console.error(error);
    return res.status(StatusCode.SERVER_ERROR).json('Internal Server Error');
  }
};

const check = (req: Request, res: Response) => {
  res.json(req.decoded);
};

const userController = {
  createAccount,
  login,
  emailValidation,
  searchUsers,
  check,
};

export default userController;
