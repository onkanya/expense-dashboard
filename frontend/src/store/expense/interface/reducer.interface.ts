import { IExpense } from 'interfaces/expense.interface';

export interface IExpenseReducer {
  expenses: IExpense[];
  total: Number;
  totalExpense: Number;
  error?: string;
}
