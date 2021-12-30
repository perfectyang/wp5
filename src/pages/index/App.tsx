import useLockFn from './hooks/useLockFn';
import useMap from './hooks/useMap';
import useUpdateEffect from './hooks/useUpdateEffect';
import React from 'react';
// import { useMemoizedFn } from 'ahooks';

const FakeApi = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 3000);
  });
};

interface IProps {}
const Index: React.FC<IProps> = ({}) => {
  // const fn = useMemoizedFn((a) => {});
  const fnClick = useLockFn(FakeApi);
  const [map, { set, get }] = useMap([]);
  const [count, setCount] = React.useState(0);
  useUpdateEffect(() => {
    console.log('进来');
    return () => {
      console.log('消');
      // do something
    };
  }, [count]);

  return (
    <>
      {JSON.stringify(Array.from(map), null, 2)}
      <hr />
      {count}
      <hr />
      <button
        onClick={() => {
          set('name' + Math.random(), 'js' + Math.random());
          // fnClick('hello');
        }}
      >
        click
      </button>
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        count
      </button>
    </>
  );
};

export default Index;
