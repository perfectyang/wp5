import React from 'react';
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const areas = [
  { label: <span>北京-----</span>, value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
];

const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
};

function useCloneElement(Comp) {
  const [value, setValue] = React.useState<string>('');
  const node = React.cloneElement(Comp, {
    ...Comp.props,
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
  });
  console.log('Comp', node);
  return <div>{node}</div>;
}
function TestElement() {
  return useCloneElement(<input />);
}

const Index = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  const handleChange = (e) => {
    form.setFieldsValue({ list: [] });
  };

  return (
    <>
      <TestElement />
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="area"
          label="Area"
          rules={[{ required: true, message: 'Missing area' }]}
        >
          <Select options={areas} onChange={handleChange} />
        </Form.Item>
        <Form.List name="list">
          {(fields, { add, remove, ...ret }) => {
            console.log('fields', fields, ret);
            return (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item noStyle shouldUpdate>
                      {() => (
                        <Form.Item
                          {...field}
                          label="Sight"
                          name={[field.name, 'sight']}
                          rules={[{ required: true, message: 'Missing sight' }]}
                        >
                          <Select
                            disabled={!form.getFieldValue('area')}
                            style={{ width: 130 }}
                          >
                            {(sights[form.getFieldValue('area')] || []).map(
                              (item) => (
                                <Option key={item} value={item}>
                                  {item}
                                </Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                      )}
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Price"
                      name={[field.name, 'price']}
                      rules={[{ required: true, message: 'Missing price' }]}
                    >
                      <Input />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add sights
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item shouldUpdate>
          {({ getFieldValue }) => {
            return <div>{getFieldValue(['area'])}</div>;
          }}
        </Form.Item>
        <Form.Item label="Fail" validateStatus="validating" help="error">
          <Input placeholder="unavailable choice" id="error" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Index;
