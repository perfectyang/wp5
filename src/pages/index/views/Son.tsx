import React from 'react';
import { useFormContext } from '../store';

interface IProps {}
function Son({}) {
  const { getValues } = useFormContext();
  const [, updated] = React.useState({});

  const update = function () {
    updated({});
  };

  React.useEffect(() => {
    getValues.call(this, 'name', update);
  }, []);
  return (
    <>
      {getValues.call(this, 'name', update)}
      <h1
        onClick={() => {
          console.log(111);
        }}
      >
        parent
      </h1>
    </>
  );
}

export default Son;
