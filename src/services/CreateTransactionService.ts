import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction, { transactionType } from '../models/Transaction';

interface TransactionRequest {
  title: string;
  value: number;
  type: transactionType;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionRequest): Transaction {
    return this.transactionsRepository.create({
      title,
      value,
      type,
    });
  }
}

export default CreateTransactionService;
