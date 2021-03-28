export interface IExpense {
  _id: String;
  description: String;
  amount: Number;
  month: String;
  year: Number;
}

export interface ICreateExpense {
  _id: String;
  description: String;
  amount: Number;
  date: String;
}

export interface IExpensePayload {
  description: String;
  amount: Number;
  month: String;
}

export interface IExpenseListResponse {
  expenses: IExpense[];
  count: Number;
  total: Number;
  totalExpense: Number;
}

export interface IPagination {
  size?: Number;
  page?: Number;
}
