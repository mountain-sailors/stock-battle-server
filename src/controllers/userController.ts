import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import StatusCode from '../@types/statusCode';
import userService from '../services/userService';

const createAccount = (req: Request, res: Response) => {
  try {
    const { username, email, password, avatar } = req.body;
    userService.createUser(username, email, password, avatar);
    return res.status(StatusCode.OK).json('Created');
  } catch (err) {
    console.error(err);
    return res.status(StatusCode.SERVER_ERROR).json('Error occured');
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 아까 local로 등록한 인증과정 실행
    return passport.authenticate('local', { session: false }, (passportErr, user) => {
      // 인증이 실패했거나 유저데이터 없다면 에러
      if (passportErr || !user) {
        console.error(passportErr);
        return res.status(400).json({ success: false, message: '로그인 실패' });
      }
      // user 데이터를 통해 로그인 진행
      req.login(user, { session: false }, (loginErr) => {
        if (loginErr) {
          console.log(loginErr);
          return res.send(loginErr);
        }

        // 토큰 생성
        const token = jwt.sign({ userEmail: user.email }, process.env.JWT_SECRET!, { expiresIn: '7d' });
        return res.json({ success: true, message: '로그인 성공', token });
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const check = (req: Request, res: Response) => {
  res.json(req.decoded);
};

const userController = {
  createAccount,
  login,
  check,
};

export default userController;
