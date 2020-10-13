import * as express from 'express';
import BaseController from './BaseController';

class GetUserController extends BaseController {
  protected async run(
    _: express.Request,
    res: express.Response
  ): Promise<void | any> {
    try {
      return this.success(res, { user: res.locals.user });
    } catch (err) {
      return this.fail(res, err.toString());
    }
  }
}

export default GetUserController;
