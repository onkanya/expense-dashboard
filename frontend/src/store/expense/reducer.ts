import { IExpenseReducer } from './interface/reducer.interface';
import {
  ExpenseActionType,
  IExpenseAction
} from './interface/action.interface';

const initState: IExpenseReducer = {
  expenses: [],
  total: 0,
  totalExpense: 0,
  error: undefined
};
export const expenseReducer = (
  state: IExpenseReducer = initState,
  action: IExpenseAction
): IExpenseReducer => {
  switch (action.type) {
    case ExpenseActionType.FETCH_EXPENSES:
      if (action.fetchExpense) {
        return {
          ...state,
          ...action.fetchExpense,
          expenses: action.fetchExpense.expenses,
          error: undefined
        };
      }
      return state;
    case ExpenseActionType.FETCH_MORE_EXPENSES:
      if (action.fetchExpense) {
        return {
          ...state,
          expenses: [...state.expenses, ...action.fetchExpense.expenses],
          error: undefined
        };
      }
      return state;
    case ExpenseActionType.FETCH_ERROR:
      if (action.fetchError) {
        return {
          ...state,
          error: action.fetchError
        };
      }
      return state;
    default:
      return state;
  }
};
