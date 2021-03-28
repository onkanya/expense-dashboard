import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import expenseRouter from 'router/expense';
const app = express();
// connect db
mongoose.connect(
  process.env.MONGO_URI || 'mongodb://localhost:27017/ExpenseDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: false
  }
);

// handle error
mongoose.connection.on('error', err => {
  console.error('MongoDB error', err);
  process.exit(1);
});

app.use(cors());
app.use(express.json());

app.use('/expense', expenseRouter);

app.listen(8080, () => {
  console.log('Application is running on port 8080');
});
