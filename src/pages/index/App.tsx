import React from 'react';
import { observer } from './formily';
import Observer from './Observer';
import Son from './Son';

interface IProps {}
const App: React.FC<IProps> = ({}) => {
  const obs = observer({ name: 'perfectyang', age: 11 });
  return (
    <>
      <Observer>{() => <div>{obs.name}</div>}</Observer>
      <div>
        <Observer>
          {() => {
            console.log('render-name');
            return (
              <input
                value={obs.name}
                onChange={(e) => (obs.name = e.target.value)}
              />
            );
          }}
        </Observer>
      </div>
      <div>
        <Observer>
          {() => {
            console.log('render-age');
            return (
              <input
                value={obs.age}
                onChange={(e) => (obs.age = e.target.value)}
              />
            );
          }}
        </Observer>
      </div>
      <Son name={obs.name} />
    </>
  );
};

export default App;
