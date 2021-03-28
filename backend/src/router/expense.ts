import express from 'express';
import {
  getListExpense,
  createExpense,
  updateExpense,
  deleteExpense
} from 'controllers/expense.controller';
const expenseRouter = express.Router();

expenseRouter.get('', getListExpense);
expenseRouter.post('/create', createExpense);
expenseRouter.put('/update/:id', updateExpense);
expenseRouter.delete('/delete/:id', deleteExpense);

export default expenseRouter;
