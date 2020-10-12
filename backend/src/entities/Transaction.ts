import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum TransactionType {
  Deposit = 1,
  Withdrawal = 2,
  Payment = 3,
}

@Entity()
export default class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: TransactionType;

  @Column()
  description: string;

  @Column('double')
  value: number;

  @Column()
  date: Date;
}
