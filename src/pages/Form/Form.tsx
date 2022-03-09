import React from 'react';
import { useForm } from './useForm';
interface IContext {
  getValues: () => void;
  setValues: () => void;
}

export const Context = React.createContext<IContext>({
  getValues: () => {
    console.log(111);
  },
  setValues: () => {
    console.log(111);
  },
});

interface IProps {
  form?: any;
  children?: React.ReactNode;
}

export const Form: React.FC<IProps> = ({ form, children }) => {
  const [formInstance] = useForm(form);
  return (
    <>
      <Context.Provider value={formInstance}>{children}</Context.Provider>
    </>
  );
};
