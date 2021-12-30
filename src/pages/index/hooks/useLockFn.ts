import React from 'react';

const Index = (fn) => {
  const lockRef = React.useRef(false);
  return React.useCallback(
    async (...args) => {
      if (lockRef.current) return;
      lockRef.current = true;
      try {
        const ret = await fn(args);
        lockRef.current = false;
        return ret;
      } catch (e) {
        lockRef.current = false;
        throw e;
      }
    },
    [fn]
  );
};

const Iner = () => {
  console.log(111);
};

export default Index;
