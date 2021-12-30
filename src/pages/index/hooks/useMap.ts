import React from 'react';

const Index = (initValue) => {
  const getInitValue = () => {
    return initValue === undefined ? new Map() : new Map(initValue);
  };
  const [map, setMap] = React.useState(() => getInitValue());

  const set = (name: string, entry: any) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.set(name, entry);
      return temp;
    });
  };
  const remove = (name: string) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.delete(name);
      return temp;
    });
  };

  const get = (name: string) => {
    return map.get(name);
  };
  const reset = () => {
    setMap(new Map(getInitValue()));
  };

  return [
    map,
    {
      set,
      get,
      remove,
      reset,
    },
  ] as const;
};

export default Index;
