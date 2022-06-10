import 'dotenv/config';
import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';
import { logger } from '../config/logger';
import oauthService from '../services/oauthService';

const naverLogin = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const email = await oauthService.naverLogin(code);
    console.log(email);
    // eslint-disable-next-line prefer-const
    let { isExist, user } = await oauthService.checkEmail(email, 'naver');
    if (!isExist) {
      if (user)
        return res
          .status(StatusCode.OK)
          .json({ success: false, message: 'Email exists with other social login type', token: null });
      user = await oauthService.createUser(email, 'naver');
    }
    if (!user) throw new Error('User is null. Check if user is created');
    const token = oauthService.login(user);
    return res.status(StatusCode.OK).json({ success: true, message: '로그인 성공', token });
  } catch (error) {
    console.log(error);
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const kakaoLogin = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const email = await oauthService.kakaoLogin(code);
    console.log(email);
    // eslint-disable-next-line prefer-const
    let { isExist, user } = await oauthService.checkEmail(email, 'kakao');
    if (!isExist) {
      if (user)
        return res
          .status(StatusCode.OK)
          .json({ success: false, message: 'Email exists with other social login type', token: null });
      user = await oauthService.createUser(email, 'kakao');
    }
    if (!user) throw new Error('User is null. Check if user is created');
    const token = oauthService.login(user);
    return res.status(StatusCode.OK).json({ success: true, message: '로그인 성공', token });
  } catch (error) {
    console.log(error);
    logger.error(error);
    return res.status(StatusCode.SERVER_ERROR).json();
  }
};

const oauthController = {
  naverLogin,
  kakaoLogin,
};

export default oauthController;
