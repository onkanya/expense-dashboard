import mongoose from 'mongoose';
import Joi from 'joi';
import { IExpense } from 'interfaces/expense.interface';
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    description: String,
    amount: Number,
    month: String,
    year: Number
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const ExpenseModel = mongoose.model('Expense', expenseSchema);

const validate = (expenseObj: IExpense) => {
  const schemaValidate = Joi.object({
    description: Joi.string().required(),
    amount: Joi.number().required(),
    month: Joi.string().required(),
    year: Joi.number().required()
  });
  return schemaValidate.validate(expenseObj);
};
export { ExpenseModel, validate };
