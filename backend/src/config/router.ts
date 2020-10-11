import express, { Router } from 'express';
import Container from '../config/container';

// Controllers
import AuthController from '../controllers/AuthController';
import CreateUserController from '../controllers/CreateUserController';

// import auth from '../middlewares/auth';

const userRouter = (): Router => {
  const router = Router();

  let createUserController: CreateUserController = Container.resolve(
    'createUserController'
  );

  router.get('/', (_, res) => res.send('Hello World!'));
  router.post(
    '/',
    async (req, res) => await createUserController.execute(req, res)
  );

  return router;
};

const router = (): Router => {
  const router = express.Router();

  // router.use(auth);

  router.get('/', (_, res) => {
    res.send('Hello World!');
  });

  let authController: AuthController = Container.resolve('authController');

  router.use(
    '/auth',
    async (req, res) => await authController.execute(req, res)
  );
  router.use('/users', userRouter());

  return router;
};

export default router;
