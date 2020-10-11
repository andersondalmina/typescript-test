const awilix = require('awilix');

// Controllers
import CreateUserController from '../controllers/CreateUserController';
import AuthController from '../controllers/AuthController';

// Use Cases
import CreateUser from '../use_cases/CreateUser';
import AuthenticateUser from '../use_cases/AuthenticateUser';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.CLASSIC,
});

container.register({
  createUserController: awilix.asClass(CreateUserController),
  authController: awilix.asClass(AuthController),
  createUser: awilix.asClass(CreateUser),
  authenticateUser: awilix.asClass(AuthenticateUser),
});

export default container;
