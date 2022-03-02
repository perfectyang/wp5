import React, { createContext, useContext } from 'react';
import useStore from './Context/useStore';
import Demo from './views/Demo';
import shallow from 'zustand/shallow';
const handler = (v) => {
  console.log('v', v);
};

const fn = createContext(handler);
interface IProps {}
const App: React.FC<IProps> = ({}) => {
  const call = useContext(fn);
  const [increasePopulation, getData, removeAllCount, wipeOut, getApi] =
    useStore(
      (state) => [
        state.increasePopulation,
        state.getData,
        state.removeAllCount,
        state.wipeOut,
        state.getApi,
      ],
      shallow
    );

  const [, forceUpdate] = React.useReducer((c) => {
    console.log('c', c);
    return c + 1;
  }, 0);
  console.log('1111--render');
  return (
    <>
      <Demo />
      <br />
      <button
        onClick={() => {
          increasePopulation(Math.random());
          const api = getApi();
          console.log('api', api, api.getState());
          call('aaa');
          // getData();
        }}
      >
        add---btn
      </button>
      <button
        onClick={() => {
          // increasePopulation(Math.random());
          // getData();
          removeAllCount();
        }}
      >
        add---btn
      </button>{' '}
      <button
        onClick={() => {
          wipeOut();
        }}
      >
        out
      </button>
      <button
        onClick={() => {
          forceUpdate();
        }}
      >
        forceUpdat
      </button>
    </>
  );
};

export default App;
