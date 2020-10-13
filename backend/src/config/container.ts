const awilix = require('awilix');

// Controllers
import CreateUserController from '../controllers/CreateUserController';
import AuthController from '../controllers/AuthController';
import DepositController from '../controllers/DepositController';
import WithdrawalController from '../controllers/WithdrawalController';
import ListTransactionsController from '../controllers/ListTransactionsController';
import PaymentController from '../controllers/PaymentController';
import GetUserController from '../controllers/GetUserController';

// Use Cases
import CreateUser from '../use_cases/CreateUser';
import AuthenticateUser from '../use_cases/AuthenticateUser';
import MakeDeposit from '../use_cases/MakeDeposit';
import MakeWithdrawal from '../use_cases/MakeWithdrawal';
import ListTransactions from '../use_cases/ListTransactions';
import MakePayment from '../use_cases/MakePayment';

// Repositories
import UserRepository from '../infra/database/UserRepository';
import TransactionRepository from '../infra/database/TransactionRepository';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.CLASSIC,
});

// Registering Controllers
container.register({
  createUserController: awilix.asClass(CreateUserController),
  authController: awilix.asClass(AuthController),
  depositController: awilix.asClass(DepositController),
  withdrawalController: awilix.asClass(WithdrawalController),
  listTransactionsController: awilix.asClass(ListTransactionsController),
  paymentController: awilix.asClass(PaymentController),
  getUserController: awilix.asClass(GetUserController),
});

// Registering Use Cases
container.register({
  createUser: awilix.asClass(CreateUser),
  authenticateUser: awilix.asClass(AuthenticateUser),
  makeDeposit: awilix.asClass(MakeDeposit),
  makeWithdrawal: awilix.asClass(MakeWithdrawal),
  listTransactions: awilix.asClass(ListTransactions),
  makePayment: awilix.asClass(MakePayment),
});

export const registerRepositories = (connection: any) => {
  container.register({
    userRepository: awilix.asFunction(() =>
      connection.getCustomRepository(UserRepository)
    ),
    transactionRepository: awilix.asFunction(() =>
      connection.getCustomRepository(TransactionRepository)
    ),
  });
};

export default container;
