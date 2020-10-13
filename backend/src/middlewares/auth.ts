import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Container from '../config/container';
import UserRepository from '../infra/database/UserRepository';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    res.status(401).json({ auth: false, message: 'Falha na autenticação.' });
    return;
  }

  try {
    let token = String(req.headers.authorization.split(' ')[1]);
    const decoded = <any>jwt.verify(token, process.env.JWT_SECRET ?? '');

    const userRepository: UserRepository = Container.resolve('userRepository');
    const user = await userRepository.findOne(decoded.user.id);

    if (user == null) {
      res
        .status(401)
        .json({ auth: false, message: 'Falha na autenticação.' });
    }

    res.locals.user = user;
  } catch (error) {
    res
      .status(401)
      .json({ auth: false, message: 'Falha na autenticação.' });
    return;
  }

  next();
}
