import 'dotenv/config';
import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';
import { logger } from '../config/logger';
import oauthService from '../services/oauthService';

const naverLogin = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const [email, key] = await oauthService.naverLogin(code);
    // eslint-disable-next-line prefer-const
    let { isExist, user } = await oauthService.checkKey(key, 'naver');
    if (!isExist) {
      user = await oauthService.createUser(email, key, 'naver');
    }
    if (!user) throw new Error('User is null. Check if user is created');
    const token = oauthService.login(user);
    return res.status(StatusCode.OK).json({ success: true, message: '로그인 성공', token });
  } catch (error) {
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const kakaoLogin = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const [email, key] = await oauthService.kakaoLogin(code);
    console.log(email);
    // eslint-disable-next-line prefer-const
    let { isExist, user } = await oauthService.checkKey(key, 'kakao');
    if (!isExist) {
      user = await oauthService.createUser(email, key, 'kakao');
    }
    if (!user) throw new Error('User is null. Check if user is created');
    const token = oauthService.login(user);
    return res.status(StatusCode.OK).json({ success: true, message: '로그인 성공', token });
  } catch (error) {
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const githubLogin = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const [email, key] = await oauthService.githubLogin(code);
    // eslint-disable-next-line prefer-const
    let { isExist, user } = await oauthService.checkKey(key, 'github');
    if (!isExist) {
      user = await oauthService.createUser(email, key, 'github');
    }
    if (!user) throw new Error('User is null. Check if user is created');
    const token = oauthService.login(user);
    return res.status(StatusCode.OK).json({ success: true, message: '로그인 성공', token });
  } catch (error) {
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const oauthController = {
  naverLogin,
  kakaoLogin,
  githubLogin,
};

export default oauthController;
