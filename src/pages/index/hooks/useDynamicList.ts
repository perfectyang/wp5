import React, { useState, useRef, useCallback } from 'react';

export default function useDynamicList<T>(initList: T[]) {
  const counterRef = useRef<number>(-1);
  const keyList = useRef<number[]>([]);

  const setKey = useCallback((index: number) => {
    counterRef.current++;
    keyList.current.splice(index, 0, counterRef.current);
  }, []);

  const [list, setList] = useState(() => {
    initList.forEach((_, index) => {
      setKey(index);
    });
    return initList;
  });

  const push = useCallback((item: T) => {
    setList((pre) => {
      setKey(pre.length);
      return [...pre, item];
    });
  }, []);

  const replace = useCallback((index: number, item: T) => {
    setList((l) => {
      const temp = [...l];
      temp[index] = item;
      return temp;
    });
  }, []);

  const pop = useCallback(() => {
    try {
      keyList.current = keyList.current.slice(0, keyList.current.length - 1);
    } catch (error) {
      console.error(error);
    }
    setList((l) => {
      return l.slice(0, l.length - 1);
    });
  }, []);

  const insert = useCallback((index: number, item: T) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 0, item);
      setKey(index);
      return temp;
    });
  }, []);

  const remove = useCallback((index: number) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 1);
      try {
        keyList.current.splice(index, 1);
      } catch (error) {
        console.error(error);
      }
      return temp;
    });
  }, []);

  return {
    list,
    push,
    insert,
    pop,
    remove,
    replace,
  };
}
