import * as express from 'express';
import BaseController from './BaseController';
import CreateUser from '../use_cases/CreateUser';
import AuthenticateUser from '../use_cases/AuthenticateUser';

class CreateUserController extends BaseController {
  private createUser: CreateUser;
  private authenticateUser: AuthenticateUser;

  constructor(createUser: CreateUser, authenticateUser: AuthenticateUser) {
    super();
    this.createUser = createUser;
    this.authenticateUser = authenticateUser;
  }

  protected async run(
    req: express.Request,
    res: express.Response
  ): Promise<void | any> {
    try {
      const { name, email, password } = req.body;
      const user = await this.createUser.execute(name, email, password);

      const token = await this.authenticateUser.generateToken(user);

      return this.success(res, { token });
    } catch (err) {
      return this.fail(res, err.toString());
    }
  }
}

export default CreateUserController;
