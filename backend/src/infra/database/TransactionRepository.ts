import { EntityRepository, Repository } from "typeorm";
import Transaction from "../../entities/Transaction";

@EntityRepository(Transaction)
export default class TransactionRepository extends Repository<Transaction> {

}