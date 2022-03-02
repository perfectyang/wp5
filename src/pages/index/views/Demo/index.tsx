import React from 'react';
import { Provider, useStore } from '../../Context/useRrovider';
import Son from '../Son';
// import useStore from '../../Context/useStore';
const state = {
  test: '12',
  add: (num) => {
    state.test = num;
  },
};
const createStore = () => (select) => {
  return select(state);
};
console.log('Provider', Provider);
interface IProps {}
const Index: React.FC<IProps> = (p) => {
  console.log('p', p);
  // const count = useStore((state) => state.count);
  // const state = useStore();
  return (
    <Provider createStore={createStore}>
      <Son />
    </Provider>
  );
};

export default Index;
