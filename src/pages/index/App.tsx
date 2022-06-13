import React from 'react';
import { createForm } from '@formily/core';
import { FormProvider, FormConsumer, Field } from '@formily/react';
interface IProps {}
const form = createForm();
const App: React.FC<IProps> = ({}) => {
  return (
    <>
      <FormProvider form={form}>
        <FormConsumer>
          {() => (
            <div
              style={{
                marginBottom: 20,
                padding: 5,
                border: '1px dashed #666',
              }}
            >
              实时响应：{form.values.input}
            </div>
          )}
        </FormConsumer>
      </FormProvider>
    </>
  );
};

export default App;
