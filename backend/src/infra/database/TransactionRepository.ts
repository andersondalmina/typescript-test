import { EntityRepository, Repository } from 'typeorm';
import Transaction from '../../entities/Transaction';
import User from '../../entities/User';

@EntityRepository(Transaction)
export default class TransactionRepository extends Repository<Transaction> {
  async getFromUserByPeriod(
    user: User,
    initialDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    return await this.find({
      where: {
        user: user.id,
        date: {
          $gte: initialDate,
          $lt: endDate,
        },
      },
    });
  }
}
