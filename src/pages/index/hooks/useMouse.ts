import React from 'react';

const useMouse = () => {
  const [x, setX] = React.useState(0);
  return {
    x,
    setX,
  };
};

export default useMouse;
