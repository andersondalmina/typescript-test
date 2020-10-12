const awilix = require('awilix');

// Controllers
import CreateUserController from '../controllers/CreateUserController';
import AuthController from '../controllers/AuthController';

// Use Cases
import CreateUser from '../use_cases/CreateUser';
import AuthenticateUser from '../use_cases/AuthenticateUser';

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
  createUser: awilix.asClass(CreateUser),
  authenticateUser: awilix.asClass(AuthenticateUser),
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
