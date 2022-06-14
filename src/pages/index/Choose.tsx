import React from 'react';
import Schema from './utils/async-validate';

// 自定义规则函数的模板
const descriptor: Record<string, any> = {
  name: {
    type: 'string',
    required: true,
    message: '请选择',
    // validator: (_, value) => {
    //   return new Promise((resolve, reject) => {
    //     console.log('value', value);
    //     if (!value.trim()) {
    //       reject('-------error---');
    //     }
    //     resolve('');
    //   });
    // },
  },
};
const validator = Schema(descriptor);
interface IProps {}
const App: React.FC<IProps> = ({}) => {
  const [value, setValue] = React.useState(0);
  const [err, setErr] = React.useState('');
  const handleInput = (e) => {
    setValue(e.target.value);
    validator.validate({ name: e.target.value }, (errors) => {
      if (errors.length) {
        setErr(errors[0].message);
      } else {
        setErr('');
      }
    });
  };
  const onSelect = (e) => {
    console.log('e', e);
    setValue(e.target.value);
  };
  return (
    <>
      <select style={{ width: '200px' }} onChange={handleInput} value={value}>
        <option value={''}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
      {/* <input value={value} onBlur={handleInput} onChange={handleInput} /> */}
      {err && <div style={{ color: 'red' }}>{err}</div>}
    </>
  );
};

export default App;
