import React, { useRef, useEffect } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import isEqual from 'lodash/isEqual';

export default function useDeepCompareEffect(
  effect: EffectCallback,
  deps: DependencyList
) {
  const signRef = useRef<number>(0);
  const depsRef = useRef<DependencyList>();
  if (!isEqual(deps, depsRef.current)) {
    signRef.current++;
    depsRef.current = deps;
  }
  useEffect(effect, [signRef.current]);
}
