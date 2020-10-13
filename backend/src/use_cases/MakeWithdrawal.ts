import Transaction from '../entities/Transaction';
import User from '../entities/User';
import TransactionRepository from '../infra/database/TransactionRepository';
import UserRepository from '../infra/database/UserRepository';

class MakeWithdrawal {
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
    if (user.valueAvailable < value) {
      throw new Error('Valor não disponível para retirada');
    }

    let withdrawal = Transaction.newWithdrawal(user);
    withdrawal.value = value;

    await this.transactionRepository.save(withdrawal);

    user.valueAvailable -= withdrawal.value;
    await this.userRepository.save(user);

    return withdrawal;
  }
}

export default MakeWithdrawal;
