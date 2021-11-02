import 'dotenv/config';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import userService from '../services/userService';

const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const LocalStrategyOption = {
  usernameField: 'email',
  passwordField: 'password',
};

const localVerify = async (email: string, password: string, done: Function) => {
  try {
    const user = await userService.findUser('email', email, ['*']);
    // 유저 확인
    if (!user) {
      done(null, false, { reason: 'User does not exist' });
      return;
    }
    // 비밀번호 다를 경우
    if (password !== user.password) {
      done(null, false, { reason: 'Invalid Password' });
      return;
    }
    // 확인완료시 유저 데이터 객체 전송
    done(null, user);
    return;
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const jwtStrategyOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtVerify = async (jwtPayload: JwtPayload, done: Function) => {
  try {
    const user = await userService.findUser('id', jwtPayload.id, ['*']);
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
