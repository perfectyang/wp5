import React from 'react';
import { ContextProvider, useStore } from './store';
import Parent from './views/parent';
import Son from './views/Son';

interface IProps {}
const App: React.FC<IProps> = ({}) => {
  const [getValues, setValues] = useStore({
    name: 'perfectyang',
  });
  return (
    <>
      <h1>App</h1>
      <ContextProvider.Provider
        value={{
          getValues,
          setValues,
        }}
      >
        <Parent />
        <Son />
      </ContextProvider.Provider>
    </>
  );
};

export default App;
