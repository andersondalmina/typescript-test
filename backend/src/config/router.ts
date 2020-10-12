import express, { Router } from 'express';
import Container from '../config/container';

// Controllers
import AuthController from '../controllers/AuthController';
import CreateUserController from '../controllers/CreateUserController';

import auth from '../middlewares/auth';

const router = (): Router => {
  const router = express.Router();

  let authController: AuthController = Container.resolve('authController');

  router.use(
    '/auth',
    async (req, res) => await authController.execute(req, res)
  );

  router.use(auth);
  router.use('/users', userRouter());

  return router;
};


const userRouter = (): Router => {
  const router = Router();

  try {
    let createUserController: CreateUserController = Container.resolve(
      'createUserController'
    );

    router.post(
      '/',
      async (req, res) => await createUserController.execute(req, res)
    );
  } catch (err) {
    console.log(err);
  }

  return router;
};

export default router;
