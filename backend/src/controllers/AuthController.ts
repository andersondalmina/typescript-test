import * as express from 'express';
import BaseController from './BaseController';
import AuthenticateUser from '../use_cases/AuthenticateUser';

class AuthController extends BaseController {
  private authenticateUser: AuthenticateUser;

  constructor(authenticateUser: AuthenticateUser) {
    super();
    this.authenticateUser = authenticateUser;
  }

  protected async run(
    req: express.Request,
    res: express.Response
  ): Promise<void | any> {
    try {
      const { email, password } = req.body;
      const token = await this.authenticateUser.execute(email, password);

      return this.success(res, { token });
    } catch (err) {
      return this.fail(res, err.toString());
    }
  }
}

export default AuthController;
