import React from 'react';
import Observer from './Observer';

interface IProps {
  name;
}
const Son: React.FC<IProps> = ({ name }) => {
  return (
    <>
      <Observer>{() => <div>{name}</div>}</Observer>
    </>
  );
};

export default Son;
