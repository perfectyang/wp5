import React from 'react';
import { createForm } from 'rc-form';
// formShape
const Index: React.FC = ({ form }) => {
  console.log('form', form);
  const { getFieldProps, getFieldError } = form;
  const submit = () => {
    form.validateFields((error, value) => {
      console.log(error, value);
    });
  };

  return (
    <>
      <h1>Index</h1>
      <div>
        <input
          {...getFieldProps('name', {
            // onChange() {
            //   console.log(111);
            // },
            rules: [{ required: true }],
          })}
        />
        <div>
          {getFieldError('name') ? getFieldError('name')?.join(',') : null}
        </div>
      </div>
      <div>
        <input
          {...getFieldProps('age', {
            onChange() {
              console.log(111);
            },
            rules: [{ required: true }],
          })}
        />
        <div>
          {getFieldError('age') ? getFieldError('age')?.join(',') : null}
        </div>
      </div>
      <div>
        <button onClick={submit}>submit</button>
      </div>
    </>
  );
};

export default createForm({
  onValuesChange: (prs, changed, all) => {
    console.log(prs, changed, all);
  },
})(Index);
