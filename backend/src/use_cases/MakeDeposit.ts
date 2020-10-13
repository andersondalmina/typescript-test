import User from '../entities/User';
import Transaction from '../entities/Transaction';
import TransactionRepository from '../infra/database/TransactionRepository';
import UserRepository from '../infra/database/UserRepository';

class MakeDeposit {
  private transactionRepository: TransactionRepository;
  private userRepository: UserRepository;

  constructor(
    transactionRepository: TransactionRepository,
    userRepository: UserRepository
  ) {
    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
  }

  public async execute(user: User, value: number): Promise<Transaction> {
    let deposit = Transaction.newDeposit(user);
    deposit.value = value;

    await this.transactionRepository.save(deposit);

    user.valueAvailable += deposit.value;
    await this.userRepository.save(user);

    return deposit;
  }
}

export default MakeDeposit;
