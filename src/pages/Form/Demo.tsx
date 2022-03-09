import React from 'react';
import { Form } from './Form';
import Field from './Field';
import { useForm } from './useForm';

interface IProps {}
interface ISub {
  value?: string;
  onChange?: (e: HTMLInputElement) => void;
  extra: string;
}
const Sub: React.FC<ISub> = ({ value, onChange, extra, ...args }) => {
  return (
    <>
      <input value={value} onChange={(e) => onChange(e as HTMLInputElement)} />
      <div>
        <span>show: {value}</span>
      </div>
    </>
  );
};

const Index: React.FC<IProps> = ({}) => {
  const [form] = useForm();
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Form form={form}>
        {visible && (
          <Field name="age">
            <input />
          </Field>
        )}
        <Field name="good">
          <input />
        </Field>
        <Field name="hobby">
          <Sub extra={'hellow'} />
        </Field>
        <span
          onClick={() => {
            setVisible(!visible);
          }}
        >
          show
        </span>
      </Form>
    </>
  );
};

export default Index;
