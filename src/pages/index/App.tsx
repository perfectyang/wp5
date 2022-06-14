import React from 'react';
import Schema from './utils/async-validate';

// 自定义规则函数的模板
const descriptor: Record<string, any> = {
  name: {
    type: 'string',
    required: true,
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
  const [value, setValue] = React.useState('');
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
  return (
    <>
      <input value={value} onBlur={handleInput} onChange={handleInput} />
      {err && <div style={{ color: 'red' }}>{err}</div>}
    </>
  );
};

export default App;
