import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDrag } from '@use-gesture/react';
// import App from './App';
// import { useMemoizedFn } from 'ahooks';
const map = {};
const count = 1;

export type noop = (...args: any[]) => any;

function usePersistFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const persistFn = useRef<T>();
  if (!persistFn.current) {
    persistFn.current = function (...args) {
      return fnRef.current!.apply(this, args);
    } as T;
  }

  return persistFn.current!;
}

const useMemoizedFn = (fn) => {
  const fnRef = useRef<any>(fn);
  fnRef.current = React.useMemo(() => fn, [fn]);
  const memoFnRef = useRef<any>();
  if (!memoFnRef.current) {
    memoFnRef.current = function (...args) {
      return fnRef.current.apply(this, args);
    };
  }
  return memoFnRef.current;
};

// function useMemoizedFn<T extends noop>(fn: T) {
//   const fnRef = useRef<T>(fn);
//   fnRef.current = React.useMemo(() => fn, [fn]);
//   const memoizedFn = useRef<T>();
//   if (!memoizedFn.current) {
//     memoizedFn.current = function (...args) {
//       // eslint-disable-next-line @typescript-eslint/no-invalid-this
//       return fnRef.current.apply(this, args);
//     } as T;
//   }

//   return memoizedFn.current;
// }

const App = () => {
  const [n, setN] = useState(0);
  const a = useMemoizedFn(() => {
    console.log('a', n);
  });
  // map[count] = a;
  // count++;

  return (
    <>
      {n}
      <button
        onClick={() => {
          setN((n) => Math.random());
        }}
      >
        change
      </button>
      <button
        onClick={() => {
          console.log(map[1], map[2], map[1] === map[2]);
          a();
        }}
      >
        compare
      </button>
    </>
  );
};
function DemoDrag() {
  const [config, setConfig] = useState({ x: 0, y: 0 });
  const bind = useDrag(
    (state) => {
      console.log(state);
      setConfig({
        x: state.xy[0],
        y: state.xy[1],
      });
    },
    {
      // axis: 'y',
      pointer: { touch: true },
    }
  );
  return (
    <div
      {...bind()}
      style={{
        border: '1px solid #ff0101',
        position: 'absolute',
        left: config.x + 'px',
        top: config.y + 'px',
      }}
    >
      drag
    </div>
  );
}

// ReactDOM.render(<DemoDrag />, document.querySelector('#root'));
const renderHeader = () => {
  return <p>header</p>;
};
const renderBody = () => {
  return <p>body</p>;
};
const Comp = () => {
  return <h5>Comp</h5>;
};
const test = <h3>test</h3>;

function Parent(p) {
  return (
    <>
      {React.Children.map(p.children, (child, idx) => {
        return child;
      })}
      {renderHeader()}
      {renderBody()}
      {test}
      <Comp />
    </>
  );
}

ReactDOM.render(
  <Parent>
    <h1>111</h1>
    <p>
      211
      <span>aaa</span>
    </p>
  </Parent>,
  document.querySelector('#root')
);
