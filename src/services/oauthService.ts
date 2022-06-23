import axios from 'axios';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import generateUsername from '../utils/generateUsername';

const createUser = async (email: string, type: string) => {
  const username: string = await generateUsername();
  const avatar: string = '1';
  const user = await User.create({
    username,
    email,
    type,
    avatar,
  });
  return user;
};

const checkEmail = async (email: string, type: string) => {
  const user = await User.findOne({
    where: {
      email,
    },
    raw: true,
  });
  if (!user || user.type !== type) return { isExist: false, user };
  return { isExist: true, user };
};

const login = (user: User) => {
  const token = jwt.sign({ userId: user.id, username: user.username, userEmail: user.email }, process.env.JWT_SECRET!, {
    expiresIn: '365d',
  });
  return token;
};

const naverLogin = async (code: string) => {
  const url = 'https://nid.naver.com/oauth2.0/token';

  const res: any = await axios.post(url, null, {
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.NAVER_CLIENT_ID,
      client_secret: process.env.NAVER_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code,
    },
  });
  console.log(res.data);

  const accessToken = res.data.access_token;
  console.log(accessToken);

  const userinfo: any = await axios.get('https://openapi.naver.com/v1/nid/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  console.log(userinfo.data.response);
  return userinfo.data.response.email;
};

const kakaoLogin = async (code: string) => {
  console.log(code);
  const res: any = await axios.post(`https://kauth.kakao.com/oauth/token`, null, {
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
      code,
    },
  });
  const accessToken = res.data.access_token;
  console.log(accessToken);
  const userinfo: any = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  console.log(userinfo.data.kakao_account);

  return userinfo.data.kakao_account.email;
};

const githubLogin = async (code: string) => {
  console.log(code);
  const res: any = await axios.post(`https://github.com/login/oauth/access_token`, null, {
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code,
    },
  });
  const accessToken = res.data.split('&')[0].split('=')[1];
  console.log(accessToken);
  const userinfo: any = await axios.get(`https://api.github.com/user/public_emails`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  console.log(userinfo.data);
  const email = userinfo.data.filter((el: any) => el.primary === true);
  console.log(email);
  return email[0].email;
};

const oauthService = {
  createUser,
  checkEmail,
  login,
  naverLogin,
  kakaoLogin,
  githubLogin,
};

export default oauthService;
