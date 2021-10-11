import 'dotenv/config';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';

const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const LocalStrategyOption = {
  usernameField: 'username',
  passwordField: 'password',
};

const localVerify = async (username: string, password: string, done: Function) => {
  try {
    const user = await User.findOne({ where: { username } });
    // 유저 확인
    if (!user) {
      done(null, false, { reason: 'user does not exist' });
      return;
    }
    // 비밀번호 확인 (추후 추가)
    // 비밀번호 다를 경우
    // done(null, false, { reason: 'Invalid Password' });

    // 확인완료시 유저 데이터 객체 전송
    done(null, user);
    return;
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const jwtStrategyOption = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtVerify = async (jwtPayload: JwtPayload, done: Function) => {
  try {
    const user = await User.findOne({ where: { id: jwtPayload.id } });
    if (user) {
      return done(null, user);
    }
    return done(null, false, { reason: 'Invalid authentication information' });
  } catch (error) {
    console.error(error);
    return done(error);
  }
};

const passportConfig = () => {
  passport.use(new LocalStrategy(LocalStrategyOption, localVerify));
  passport.use(new JWTStrategy(jwtStrategyOption, jwtVerify));
};

export default passportConfig;
