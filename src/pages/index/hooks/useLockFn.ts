import React from 'react';

type IFn<T> = (val: T[]) => Promise<any>;

const Index = <T>(fn: IFn<T>) => {
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

export default Index;
