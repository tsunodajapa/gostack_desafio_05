import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    // sum all separate income and outcome
    const sumIncomeAndOutcome = this.transactions.reduce(
      (total, transaction) => {
        if (transaction.type === 'income') {
          return { ...total, income: total.income + transaction.value };
        }

        // if outcome
        return { ...total, outcome: total.outcome + transaction.value };
      },
      { income: 0, outcome: 0 },
    );

    const balance = {
      ...sumIncomeAndOutcome,
      total: sumIncomeAndOutcome.income - sumIncomeAndOutcome.outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
