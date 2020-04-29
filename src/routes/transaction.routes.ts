import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import { transactionType } from '../models/Transaction';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

function convertToNumber(value: string): number {
  const number = parseInt(value, 10);
  return number;
}

function convertToTransactionType(value: string): transactionType {
  if (value === 'outcome') {
    return 'outcome';
  }
  if (value === 'income') {
    return 'income';
  }
  throw new Error('invalid transaction type');
}

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const validatedValue = convertToNumber(value);
    const validatedType = convertToTransactionType(type);

    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );
    const transaction = createTransactionService.execute({
      title,
      value: validatedValue,
      type: validatedType,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
