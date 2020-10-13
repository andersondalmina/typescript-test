import { Request, Response } from 'express';
import BaseController from './BaseController';
import MakeWithdrawal from '../use_cases/MakeWithdrawal';

class WithdrawalController extends BaseController {
  private makeWithdrawal: MakeWithdrawal;

  constructor(makeWithdrawal: MakeWithdrawal) {
    super();
    this.makeWithdrawal = makeWithdrawal;
  }

  protected async run(req: Request, res: Response): Promise<void | any> {
    try {
      var { value } = req.body;
      value = Number(value);

      if (isNaN(value)) {
        throw new Error('Valor de retirada inválido');
      }

      const withdrawal = await this.makeWithdrawal.execute(
        res.locals.user,
        value
      );

      return this.success(res, withdrawal);
    } catch (err) {
      return this.fail(res, err.toString());
    }
  }
}

export default WithdrawalController;
