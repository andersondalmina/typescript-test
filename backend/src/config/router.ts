import express, { Router } from 'express';
import Container from '../config/container';

// Controllers
import AuthController from '../controllers/AuthController';
import CreateUserController from '../controllers/CreateUserController';
import DepositController from '../controllers/DepositController';
import GetUserController from '../controllers/GetUserController';
import ListTransactionsController from '../controllers/ListTransactionsController';
import PaymentController from '../controllers/PaymentController';
import WithdrawalController from '../controllers/WithdrawalController';

import auth from '../middlewares/auth';

const router = (): Router => {
  const router = express.Router();

  const authController: AuthController = Container.resolve('authController');
  const createUserController: CreateUserController = Container.resolve(
    'createUserController'
  );

  const GetUserController: GetUserController = Container.resolve(
    'getUserController'
  );

  router.use(
    '/auth',
    async (req, res) => await authController.execute(req, res)
  );

  router.post(
    '/users',
    async (req, res) => await createUserController.execute(req, res)
  );

  router.use(auth);

  router.get(
    '/users',
    async (req, res) => await GetUserController.execute(req, res)
  );

  router.use(transactionRouter());

  return router;
};

const transactionRouter = (): Router => {
  const router = Router();

  const listTransactionsController: ListTransactionsController = Container.resolve(
    'listTransactionsController'
  );

  const depositController: DepositController = Container.resolve(
    'depositController'
  );

  const withdrawalController: WithdrawalController = Container.resolve(
    'withdrawalController'
  );

  const paymentController: PaymentController = Container.resolve(
    'paymentController'
  );

  router.get(
    '/transactions',
    async (req, res) => await listTransactionsController.execute(req, res)
  );

  router.post(
    '/deposit',
    async (req, res) => await depositController.execute(req, res)
  );

  router.post(
    '/withdrawal',
    async (req, res) => await withdrawalController.execute(req, res)
  );

  router.post(
    '/payment',
    async (req, res) => await paymentController.execute(req, res)
  );

  return router;
};

export default router;
