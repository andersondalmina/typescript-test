import { Request, Response } from 'express';
import BaseController from './BaseController';
import ListTransactions from '../use_cases/ListTransactions';

class ListTransactionsController extends BaseController {
  private listTransactions: ListTransactions;

  constructor(listTransactions: ListTransactions) {
    super();
    this.listTransactions = listTransactions;
  }

  protected async run(req: Request, res: Response): Promise<void | any> {
    try {
      const { initialDate, endDate } = req.query;

      var startDate = new Date(Number(initialDate));
      startDate.setHours(0, 0);

      var finishDate = new Date(Number(endDate));
      finishDate.setHours(23, 59);

      const transactions = await this.listTransactions.execute(
        res.locals.user,
        startDate,
        finishDate
      );

      return this.success(res, transactions);
    } catch (err) {
      return this.fail(res, err.toString());
    }
  }
}

export default ListTransactionsController;
