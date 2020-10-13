import { Request, Response } from 'express';
import BaseController from './BaseController';
import MakeDeposit from '../use_cases/MakeDeposit';

class DepositController extends BaseController {
  private makeDeposit: MakeDeposit;

  constructor(makeDeposit: MakeDeposit) {
    super();
    this.makeDeposit = makeDeposit;
  }

  protected async run(req: Request, res: Response): Promise<void | any> {
    try {
      var { value } = req.body;
      value = Number(value);

      if (isNaN(value)) {
        throw new Error('Valor de depósito inválido');
      }

      const deposit = await this.makeDeposit.execute(res.locals.user, value);

      return this.success(res, deposit);
    } catch (err) {
      return this.fail(res, err.toString());
    }
  }
}

export default DepositController;
