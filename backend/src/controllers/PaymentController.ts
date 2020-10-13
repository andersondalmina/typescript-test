import { Request, Response } from 'express';
import BaseController from './BaseController';
import MakePayment from '../use_cases/MakePayment';

class PaymentController extends BaseController {
  private makePayment: MakePayment;

  constructor(makePayment: MakePayment) {
    super();
    this.makePayment = makePayment;
  }

  protected async run(req: Request, res: Response): Promise<void | any> {
    try {
      var { value, description } = req.body;
      value = Number(value);

      if (isNaN(value)) {
        throw new Error('Valor de pagamento inválido');
      }

      const payment = await this.makePayment.execute(
        res.locals.user,
        value,
        description
      );

      return this.success(res, payment);
    } catch (err) {
      return this.fail(res, err.toString());
    }
  }
}

export default PaymentController;
