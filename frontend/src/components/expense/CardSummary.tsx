import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { IExpenseStore } from 'store/interface/expenseStore.interface';

const CardSummary = () => {
  const { total, totalExpense } = useSelector(
    (state: IExpenseStore) => state.expense
  );

  return (
    <Row
      gutter={16}
      style={{ paddingTop: '20px', paddingBottom: '20px' }}
      justify="center"
    >
      <Col xs={24} md={10}>
        <Card>
          <Statistic
            title="Expenses Summary"
            value={totalExpense.valueOf()}
            suffix="฿"
          />
        </Card>
      </Col>
      <Col xs={24} md={10}>
        <Card>
          <Statistic title="Total Expense" value={total.valueOf()} />
        </Card>
      </Col>
    </Row>
  );
};

export default CardSummary;
