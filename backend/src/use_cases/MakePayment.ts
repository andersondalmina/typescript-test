import User from '../entities/User';
import Transaction from '../entities/Transaction';
import TransactionRepository from '../infra/database/TransactionRepository';
import UserRepository from '../infra/database/UserRepository';

class MakePayment {
  private transactionRepository: TransactionRepository;
  private userRepository: UserRepository;

  constructor(
    transactionRepository: TransactionRepository,
    userRepository: UserRepository
  ) {
    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
  }

  public async execute(
    user: User,
    value: number,
    description: string
  ): Promise<Transaction> {
    if (user.valueAvailable < value) {
      throw new Error('Valor não disponível para realizar o pagamento');
    }

    let payment = Transaction.newPayment(user);
    payment.value = value;
    payment.description = description;

    this.transactionRepository.save(payment);

    user.valueAvailable -= payment.value;
    await this.userRepository.save(user);

    return payment;
  }
}

export default MakePayment;
