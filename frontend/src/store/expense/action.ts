import { IPagination } from 'interfaces/expense.interface';
import { getExpense } from 'services/expense';
import { ThunkDispatch } from 'redux-thunk';
import {
  ExpenseActionType,
  IExpenseAction
} from './interface/action.interface';

export const fetchExpense = (params: IPagination) => {
  return async (dispatch: ThunkDispatch<any, any, IExpenseAction>) => {
    try {
      const resp = await getExpense(params);
      return dispatch({
        type: ExpenseActionType.FETCH_EXPENSES,
        fetchExpense: resp
      });
    } catch (error) {
      return dispatch({
        type: ExpenseActionType.FETCH_ERROR,
        fetchError: 'Cannot get expense list.'
      });
    }
  };
};

export const fetchMoreExpense = (params: IPagination) => {
  return async (dispatch: ThunkDispatch<any, any, IExpenseAction>) => {
    try {
      const resp = await getExpense(params);
      return dispatch({
        type: ExpenseActionType.FETCH_MORE_EXPENSES,
        fetchExpense: resp
      });
    } catch (error) {
      return dispatch({
        type: ExpenseActionType.FETCH_ERROR,
        fetchError: 'Cannot get expense list.'
      });
    }
  };
};
