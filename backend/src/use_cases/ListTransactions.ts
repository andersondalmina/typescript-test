import Transaction from '../entities/Transaction';
import User from '../entities/User';
import TransactionRepository from '../infra/database/TransactionRepository';

class ListTransactions {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async execute(
    user: User,
    initialDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.getFromUserByPeriod(
      user,
      initialDate,
      endDate
    );

    return transactions;
  }
}

export default ListTransactions;
