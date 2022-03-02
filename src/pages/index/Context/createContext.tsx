import React, { useRef } from 'react';

const createStore = (createState) => {
  let state;
  // const listeners = new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    if (nextState !== state) {
      const previousState = state;
      state = replace ? nextState : Object.assign({}, state, nextState);
      // listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => {
    return state;
  };
  state = createState(setState, getState);
  return {
    setState,
    getState,
  };
};

function create(createState) {
  const api =
    typeof createState === 'function' ? createStore(createState) : createState;
  const useStore = (selector) => {
    const [, forceUpdate] = React.useReducer((c) => c + 1, 0) as [
      never,
      () => void
    ];
    const state = api.getState();
    const stateRef = useRef(state);
    const selectorRef = useRef(selector);
    const erroredRef = useRef(false);

    const currentSliceRef = useRef();
    if (currentSliceRef.current === undefined) {
      currentSliceRef.current = selector(state);
    }
  };
  return useStore;
}

export function createContext() {
  const ZustandContext = React.createContext(undefined);

  const Provider = function Provider(_ref) {
    const initialStore = _ref.initialStore;
    let createStore = _ref.createStore;
    const children = _ref.children;
    const storeRef = React.useRef();

    if (!storeRef.current) {
      if (initialStore) {
        console.warn(
          'Provider initialStore is deprecated and will be removed in the next version.'
        );

        if (!createStore) {
          createStore = function createStore() {
            return initialStore;
          };
        }
      }

      storeRef.current = createStore();
    }
    console.log('storeRef.current', storeRef.current);

    return React.createElement(
      ZustandContext.Provider,
      {
        value: storeRef.current,
      },
      children
    );
  };

  const useStore = function useStore(selector?, equalityFn?) {
    if (equalityFn === void 0) {
      equalityFn = Object.is;
    }
    const useProviderStore = React.useContext(ZustandContext);
    console.log('useProviderStore', useProviderStore);
    return useProviderStore(selector, equalityFn);
  };

  return {
    Provider: Provider,
    useStore: useStore,
  };
}
