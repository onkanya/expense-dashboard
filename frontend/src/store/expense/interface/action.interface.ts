import { IExpenseListResponse } from 'interfaces/expense.interface';

export enum ExpenseActionType {
  FETCH_EXPENSES = 'FETCH_EXPENSES',
  FETCH_MORE_EXPENSES = 'FETCH_MORE_EXPENSES',
  FETCH_ERROR = 'FETCH_ERROR'
}

export interface IExpenseAction {
  type: ExpenseActionType;
  fetchExpense?: IExpenseListResponse;
  fetchError?: string;
}
