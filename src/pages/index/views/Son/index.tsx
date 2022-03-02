import React from 'react';
import { useStore } from '../../Context/useRrovider';
interface IProps {}
const Index: React.FC<IProps> = ({}) => {
  const test = useStore((state) => state.test);
  const add = useStore((state) => state.add);
  return (
    <>
      <h1>{test}</h1>
      <button
        onClick={() => {
          add();
        }}
      >
        add
      </button>
    </>
  );
};

export default Index;
