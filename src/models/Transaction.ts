import { uuid } from 'uuidv4';

export type transactionType = 'income' | 'outcome';
class Transaction {
  id: string;

  title: string;

  value: number;

  type: transactionType;

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
