import React from 'react';
import type { DependencyList, EffectCallback } from 'react';

const useUpdateEffect = (effect: EffectCallback, deps: DependencyList = []) => {
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
      effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);
};

export default useUpdateEffect;
