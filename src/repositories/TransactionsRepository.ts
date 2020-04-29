import Transaction, { transactionType } from '../models/Transaction';

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: transactionType;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    balance = this.transactions.reduce(
      (previousBalance, currentTransaction) => {
        const accumulatorBalance = previousBalance;
        if (currentTransaction.type === 'income') {
          accumulatorBalance.income += currentTransaction.value;
          accumulatorBalance.total += currentTransaction.value;
        }

        if (currentTransaction.type === 'outcome') {
          accumulatorBalance.outcome += currentTransaction.value;
          accumulatorBalance.total -= currentTransaction.value;
        }

        return accumulatorBalance;
      },
      balance,
    );

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (!this.canPerformTransaction(transaction)) {
      throw new Error('can not perform transation');
    }

    this.transactions.push(transaction);

    return transaction;
  }

  private canPerformTransaction(transaction: Transaction): boolean {
    const balance = this.getBalance();
    if (transaction.type === 'outcome' && transaction.value > balance.total) {
      return false;
    }

    return true;
  }
}

export default TransactionsRepository;
