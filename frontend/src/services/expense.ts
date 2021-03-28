import axiosInstance from './apiUrl';
import {
  IExpensePayload,
  IExpenseListResponse,
  IPagination
} from 'interfaces/expense.interface';

const getExpense = async (params: IPagination) => {
  const expenseRes = await axiosInstance.get<IExpenseListResponse>(`/expense`, {
    params
  });
  return expenseRes.data;
};

const reqCreateExpense = async (payload: IExpensePayload) => {
  const expenseRes = await axiosInstance.post(`/expense/create`, payload);
  return expenseRes;
};

const reqUpdateExpense = async (payload: IExpensePayload, id: String) => {
  const expenseRes = await axiosInstance.put(`/expense/update/${id}`, payload);
  return expenseRes;
};

const reqDeletExpense = async (id: String) => {
  const expenseRes = await axiosInstance.delete(`/expense/delete/${id}`);
  return expenseRes;
};

export { getExpense, reqCreateExpense, reqUpdateExpense, reqDeletExpense };
