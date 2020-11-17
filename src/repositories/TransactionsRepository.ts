import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;
    return transactions;
  }

  public getBalance(): Balance {
    const initBalance: Balance = { income: 0, outcome: 0, total: 0 };
    const balance = this.transactions.reduce((init, cur) => {
      // const bal: Balance = { income: 0, outcome: 0, total: 0 };
      if (cur.type === 'income') {
        initBalance.income += cur.value;
        initBalance.total += cur.value;
      }
      if (cur.type === 'outcome') {
        initBalance.outcome += cur.value;
        initBalance.total -= cur.value;
      }

      return initBalance;
    }, initBalance);
    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
