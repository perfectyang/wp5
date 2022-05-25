import React from 'react';
class Store {
  store: object;
  state: object;
  constructor(state: any) {
    this.store = {};
    this.state = state;
  }

  setValue = () => {
    const that = this;
    return function (name, value) {
      const curInstance = that.store[name];
      that.state[name] = value;
      curInstance.forEach((comp) => {
        comp[name].update(name, value);
      });
    };
  };

  getValue = () => {
    const that = this;
    return function (name, update: any) {
      let instance = that.store[name];
      if (!instance) {
        instance = that.store[name] = new Set();
      }
      instance.add({
        [name]: update,
      });
      return that.state[name];
    };
  };
}

export const useStore = (state) => {
  const formRef = React.useRef(null);
  if (!formRef.current) {
    formRef.current = new Store(state);
  }
  function getValues(namePath: string) {
    return formRef.current.getValue().call(this, namePath);
  }
  function setValues(namePath: string, value: any) {
    return formRef.current.getValue().call(this, namePath);
  }
  return [getValues, setValues];
};

export const ContextProvider = React.createContext({});

export const useFormContext = () => {
  return React.useContext(ContextProvider);
};
