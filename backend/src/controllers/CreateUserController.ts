import * as express from 'express';
import BaseController from './BaseController';
import CreateUser from '../use_cases/CreateUser';

class CreateUserController extends BaseController {
  private createUser: CreateUser;

  constructor(createUser: CreateUser) {
    super();
    this.createUser = createUser;
  }

  protected async run(
    req: express.Request,
    res: express.Response
  ): Promise<void | any> {
    try {
      const { name, email, password } = req.body;
      this.createUser.execute(name, email, password);

      return this.success(res);
    } catch (err) {
      return this.fail(res, err.toString());
    }
  }
}

export default CreateUserController;
