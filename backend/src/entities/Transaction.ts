import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';
import User from './User';

enum TransactionType {
  Deposit = 1,
  Withdrawal = 2,
  Payment = 3,
}

@Entity()
export default class Transaction {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  user: ObjectID;

  @Column()
  type: TransactionType;

  @Column()
  description: string;

  @Column('double')
  value: number;

  @Column()
  date: Date;

  static newDeposit(user: User): Transaction {
    let deposit = new this();
    deposit.user = user.id;
    deposit.type = TransactionType.Deposit;
    deposit.date = new Date();

    return deposit;
  }

  static newWithdrawal(user: User): Transaction {
    let withdrawal = new this();
    withdrawal.user = user.id;
    withdrawal.type = TransactionType.Withdrawal;
    withdrawal.date = new Date();

    return withdrawal;
  }

  static newPayment(user: User): Transaction {
    let payment = new this();
    payment.user = user.id;
    payment.type = TransactionType.Payment;
    payment.date = new Date();

    return payment;
  }
}
