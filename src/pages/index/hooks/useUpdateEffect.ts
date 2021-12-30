import React from 'react';

const useUpdateEffect = (fn, deps) => {
  const localRef = React.useRef(false);
  React.useEffect(() => {
    return () => {
      localRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (!localRef.current) {
      localRef.current = true;
    } else {
      fn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);
};

export default useUpdateEffect;
