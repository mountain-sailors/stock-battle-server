import { Request, Response } from 'express';
import StatusCode from '../@types/statusCode';

const test = (req: Request, res: Response) => {
  try {
    return res.status(StatusCode.OK).json('Test Success!');
  } catch (err) {
    return res.status(StatusCode.SERVER_ERROR).json('Error occured');
  }
};

const testController = {
  test,
};

export default testController;
