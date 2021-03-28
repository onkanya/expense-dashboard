import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { expenseReducer } from './expense/reducer';
import { IExpenseStore } from './interface/expenseStore.interface';

const store = createStore<IExpenseStore, any, any, any>(
  combineReducers({
    expense: expenseReducer
  }),
  applyMiddleware(thunk)
);

export default store;
