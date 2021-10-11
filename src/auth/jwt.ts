import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import statusCode from '../@types/statusCode';

declare global {
  namespace Express {
    interface Request {
      decoded: string | jwt.JwtPayload;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const { JWT_SECRET } = process.env;

    req.decoded = jwt.verify(authorization!, JWT_SECRET!);

    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(statusCode.TOKEN_EXPIRED).json({ message: 'Token Expired' });
    }
    return res.status(statusCode.CLIENT_ERROR).json({ message: 'Invalid Token' });
  }
};

export default verifyToken;