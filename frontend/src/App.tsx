import React, { useEffect, useCallback, useState } from 'react';
import './App.css';
import {
  reqCreateExpense,
  reqUpdateExpense,
  reqDeletExpense
} from 'services/expense';
import { IExpense, ICreateExpense } from 'interfaces/expense.interface';
import CardSummary from 'components/expense/CardSummary';

import moment from 'moment';
import {
  Layout,
  List,
  PageHeader,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Typography,
  Statistic,
  notification
} from 'antd';
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { IExpenseStore } from 'store/interface/expenseStore.interface';
import { fetchExpense, fetchMoreExpense } from 'store/expense/action';
const { Content } = Layout;
const { Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const App = () => {
  const expense = useSelector((state: IExpenseStore) => state.expense);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  const handleGetExpenses = useCallback(async () => {
    setPage(1);
    dispatch(fetchExpense({ page: 1, size: 5 }));
  }, [setPage, dispatch]);

  const handleGetMoreExpenses = async () => {
    dispatch(fetchMoreExpense({ page: page + 1, size: 5 }));
    setPage(page + 1);
  };

  useEffect(() => {
    handleGetExpenses();
  }, [handleGetExpenses]);

  useEffect(() => {
    if (expense.error) {
      notification.error({
        message: `Cannot Get Expense`,
        placement: 'topRight'
      });
    }
  }, [expense]);

  const handleSubmit = (values: ICreateExpense) => {
    const { _id } = values;
    if (!!_id) {
      handleUpdateExpense(values);
    } else {
      handleCreateExpense(values);
    }
  };

  const handleCreateExpense = async (values: ICreateExpense) => {
    const { amount, description, date } = values;
    const payload = {
      amount,
      description,
      month: moment(date.toString()).format('MMMM'),
      year: parseInt(moment(date.toString()).format('YYYY'))
    };

    try {
      const createRes = await reqCreateExpense(payload);
      if (createRes) {
        closeModal();
        notification.success({
          message: `Created Expense`,
          placement: 'topRight'
        });
        handleGetExpenses();
      }
    } catch (error) {
      notification.error({
        message: `Cannot Create`,
        description: error,
        placement: 'topRight'
      });
    }
  };

  const handleUpdateExpense = async (values: ICreateExpense) => {
    const { amount, description, date, _id } = values;
    const payload = {
      amount,
      description,
      month: moment(date.toString()).format('MMMM'),
      year: parseInt(moment(date.toString()).format('YYYY'))
    };

    try {
      const updateRes = await reqUpdateExpense(payload, _id);
      if (updateRes) {
        closeModal();
        notification.success({
          message: `Updated Expense`,
          placement: 'topRight'
        });
        handleGetExpenses();
      }
    } catch (error) {
      notification.error({
        message: `Cannot Update`,
        description: error,
        placement: 'topRight'
      });
    }
  };

  const handleInitialData = (data: IExpense) => {
    form.setFieldsValue({
      ...data,
      date: moment(`${data.year}-${data.month}`, 'YYYY-MMMM')
    });
    setOpenModal(true);
  };

  const handleConfirmDelete = async (id: String) => {
    Modal.confirm({
      title: 'Confirm Delete',
      icon: <QuestionCircleOutlined />,
      content: 'Are you sure to delete?',
      okText: 'Confirm',
      okType: 'danger',
      onOk: () => handleDelete(id),
      centered: true
    });
  };

  const handleDelete = async (id: String) => {
    try {
      await reqDeletExpense(id);
      notification.success({
        message: `Deleted Expense`,
        placement: 'topRight'
      });
      handleGetExpenses();
    } catch (error) {
      notification.error({
        message: `Cannot Delete`,
        description: error,
        placement: 'topRight'
      });
    }
  };

  const closeModal = () => {
    form.resetFields();
    setOpenModal(false);
  };

  return (
    <Layout>
      <PageHeader
        ghost={false}
        title="Expense"
        subTitle="Welcome to Expense Dashboard"
      />
      <Modal
        title="Create Expense"
        centered
        visible={openModal}
        onOk={() => form.submit()}
        onCancel={closeModal}
        destroyOnClose={true}
        okText="Save Changes"
      >
        <Form
          {...layout}
          form={form}
          name="basic"
          onFinish={handleSubmit}
          initialValues={{ date: moment() }}
        >
          <Form.Item name="_id" hidden />
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input your amount!' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please input your description!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please input your month!' }]}
          >
            <DatePicker picker="month" format="YYYY-MMMM" />
          </Form.Item>
        </Form>
      </Modal>
      <Content style={{ padding: '0 40px' }}>
        <CardSummary />
        <Row justify="center">
          <Col>
            <Button key="1" type="primary" onClick={() => setOpenModal(true)}>
              Create Expense
            </Button>
          </Col>
        </Row>
        <Row justify="center">
          <Col
            xs={24}
            md={20}
            style={{
              background: '#fff',
              padding: '20px 26px',
              marginTop: '20px'
            }}
          >
            <List
              dataSource={expense.expenses}
              loadMore={
                expense.expenses.length !== expense.total && (
                  <Row justify="center" style={{ paddingTop: '20px' }}>
                    <Col>
                      <Button onClick={handleGetMoreExpenses}>Load more</Button>
                    </Col>
                  </Row>
                )
              }
              renderItem={item => (
                <List.Item
                  key={`${item.amount}-${item.description.trim()}`}
                  actions={[
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => handleInitialData(item)}
                    >
                      edit
                    </Button>,
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => handleConfirmDelete(item._id)}
                      danger
                    >
                      delete
                    </Button>
                  ]}
                >
                  <Row>
                    <Col span={24}>
                      <Text strong>
                        <Statistic
                          value={item.amount.valueOf()}
                          valueStyle={{
                            fontWeight: 'bold',
                            fontSize: '18px'
                          }}
                          suffix="฿"
                        />
                      </Text>
                    </Col>
                    <Col span={24}>
                      <Text type="secondary">
                        Description: {item.description}
                      </Text>
                    </Col>
                    <Col span={24}>
                      <Text disabled>
                        <CalendarOutlined /> : {item.month} {item.year}
                      </Text>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
