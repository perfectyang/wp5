import React from 'react';
import { Form, Input, Button, Checkbox, Radio } from 'antd';
type LayoutType = Parameters<typeof Form>[0]['layout'];
const Index = () => {
  const [initialValues, setInitialValues] = React.useState({
    account: {
      name: '初始类型',
      password: 2222,
      remember: false,
    },
  });
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();
  React.useEffect(() => {
    // form.setFieldsValue({
    //   account: {
    //     name: 'xxx',
    //     password: 111,
    //     remember: false,
    //   },
    // });
  }, []);

  const setValue = () => {
    form.setFields([
      {
        value: 'newName',
        name: ['account', 'name'],
      },
    ]);
  };

  const resetValue = () => {
    form.resetFields();
    // form.resetFields([['account', 'name']]);
  };
  const isFieldTouched = () => {
    // ['account', 'name']
    const bool = form.isFieldsTouched();
    console.log('bool', bool);
  };
  const [formLayout, setFormLayout] = React.useState<LayoutType>('horizontal');
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: { span: 14, offset: 4 },
        }
      : null;
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  return (
    <div style={{ width: '500px', margin: '50px auto' }}>
      <Form
        name="basic"
        form={form}
        layout={formLayout}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onValuesChange={onFormLayoutChange}
        labelWrap
        labelCol={{ flex: '80px' }}
        wrapperCol={{ flex: 1 }}
        labelAlign="right"
        colon={false}
      >
        <Form.Item label="Form Layout" name="layout">
          <Radio.Group value={formLayout}>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="用户名"
          name={['account', 'name']}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name={['account', 'password']}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name={['account', 'remember']} valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue, getFieldInstance }) => {
            console.log('ret', getFieldInstance(['account', 'name']));
            return <div>{getFieldValue(['account', 'name'])}</div>;
          }}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            setValue();
          }}
        >
          setValue
        </Button>
        <Button
          type="primary"
          onClick={() => {
            resetValue();
          }}
        >
          reset
        </Button>
        <Button
          type="primary"
          onClick={() => {
            isFieldTouched();
          }}
        >
          isFieldTouched
        </Button>
      </Form>
    </div>
  );
};
export default Index;
