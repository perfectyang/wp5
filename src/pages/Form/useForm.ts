import React from 'react';
class FormStore {
  public forceUpdate: any;
  private store: any = {};
  private fieldEntries: any = new Map();
  constructor(forceUpdate) {
    this.forceUpdate = forceUpdate;
  }

  getValue = (name: string) => {
    return this.store[name] ?? '';
  };

  setValue = (name: string, value: any) => {
    this.store = {
      ...this.store,
      [name]: value,
    };
    if (this.fieldEntries.get(name)) {
      this.fieldEntries.get(name)();
    } else {
      this.forceUpdate();
    }
  };
  registerField = (name: string, fn: any) => {
    this.fieldEntries.set(name, fn);
    return () => {
      this.fieldEntries.delete(name);
    };
  };
  getForm() {
    return {
      getValues: this.getValue,
      setValues: this.setValue,
      registerField: this.registerField,
    };
  }
}

export const useForm = (form?) => {
  const formRef = React.useRef(null);
  const [, forceUpdate] = React.useState({});
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const forceReRender = () => {
        forceUpdate({});
      };
      const store = new FormStore(forceReRender);
      formRef.current = store.getForm();
    }
  }
  return [formRef.current];
};
