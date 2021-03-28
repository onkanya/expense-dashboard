import { Response, Request } from 'express';
import { IPagination } from 'interfaces/pagination.interface';
import { ExpenseModel, validate } from 'models/expense.model';

const getListExpense = async (
  req: Request<unknown, unknown, unknown, IPagination>,
  res: Response
) => {
  const reqQuery = req.query;
  try {
    // Get list
    const statement = ExpenseModel.find();
    if (reqQuery.page && reqQuery.size) {
      const page = parseInt(reqQuery.page);
      const size = parseInt(reqQuery.size);
      const offset = (page - 1) * size;
      statement.skip(offset).limit(size);
    }
    const expenses = await statement.exec();
    // Get summary
    const summary = await ExpenseModel.aggregate([
      {
        $group: {
          _id: null,
          totalExpense: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: false,
          totalExpense: true,
          count: true
        }
      }
    ]).exec();
    // Response to client
    res.status(200).json({
      expenses: expenses,
      count: expenses.length,
      total: summary[0]?.count || 0,
      totalExpense: summary[0]?.totalExpense || 0
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const createExpense = async (req: Request, res: Response) => {
  const payload = req.body;
  const { error } = validate(payload);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({
      message
    });
  }
  try {
    const expense = new ExpenseModel(payload);
    await expense.save();
    res.status(201).json({
      message: 'Created success'
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

const updateExpense = async (req: Request, res: Response) => {
  const payload = req.body;
  const { id } = req.params;
  const { error } = validate(payload);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({
      message
    });
  }
  try {
    await ExpenseModel.findOneAndUpdate({ _id: id }, payload);
    const expense = await ExpenseModel.findOne({ _id: id });
    res.status(201).json({
      message: 'Updated success',
      data: expense
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await ExpenseModel.findByIdAndDelete({ _id: id });
    res.status(201).json({
      message: 'Deleted success'
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

export { getListExpense, createExpense, updateExpense, deleteExpense };
