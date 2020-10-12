import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function (req: Request, res: Response, next: NextFunction) {
  if (!req.headers.token) {
    res
      .status(401)
      .json({ auth: false, message: 'Failed to authenticate token.' });
    return;
  }

  try {
    let token = String(req.headers.token);
    const decoded = <any>jwt.verify(token, process.env.JWT_SECRET ?? '');

    res.locals.user = decoded.user;
  } catch (error) {
    res
      .status(401)
      .json({ auth: false, message: 'Failed to authenticate token.' });
    return;
  }

  next();
}
