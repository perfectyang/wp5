import useLockFn from './hooks/useLockFn';
import useMap from './hooks/useMap';
import useUpdateEffect from './hooks/useUpdateEffect';
import React from 'react';
import { render, unmountComponentAtNode, createPortal } from 'react-dom';
// import { useMemoizedFn } from 'ahooks';

const FakeApi = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 3000);
  });
};

interface IProps {}
const Demo: React.FC<IProps> = ({}) => {
  // const fn = useMemoizedFn((a) => {});
  const fnClick = useLockFn(FakeApi);
  const [map, { set, get }] = useMap([]);
  const [count, setCount] = React.useState(0);
  useUpdateEffect(() => {
    console.log('进来');
    return () => {
      console.log('消');
      // do something
    };
  }, [count]);

  return (
    <>
      {JSON.stringify(Array.from(map), null, 2)}
      <hr />
      {count}
      <hr />
      <button
        onClick={() => {
          set('name' + Math.random(), 'js' + Math.random());
          // fnClick('hello');
        }}
      >
        click
      </button>
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        count
      </button>
    </>
  );
};
import useDynamicList from './hooks/useDynamicList';
import Toast, { showToast, destoryToast } from './Toast/index';

const ExtraNode = () => {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <h1>{count}</h1>
      <span
        onClick={() => {
          setCount((n) => ++n);
        }}
      >
        alert
      </span>
    </>
  );
};

interface IListItem {
  id: number;
  name: string;
}

const Demo2 = () => {
  const listRef = React.useRef([
    {
      id: 666,
      name: '9999',
    },
  ]);
  const { list, push, pop, insert, remove, replace } =
    useDynamicList<IListItem>(listRef.current);
  const insertItem = (idx: number) => {
    insert(idx, { id: Math.random(), name: Math.random() + '插入' });
  };

  return (
    <>
      {/* <div id="extraNode" className="parent"></div> */}
      {list.map((item, idx) => (
        <React.Fragment key={item.id}>
          <p>
            id:{item.id}---{item.name}----
            <input
              value={item.name}
              onChange={(e) => {
                replace(idx, {
                  id: item.id,
                  name: e.target.value,
                });
              }}
            />
            <button onClick={() => insertItem(idx)}>insert</button>-
            <button onClick={() => remove(idx)}>x</button>
          </p>
        </React.Fragment>
      ))}
      <button
        onClick={() => {
          push({
            id: Math.random(),
            name: Math.random() + '',
          });
        }}
      >
        add
      </button>
      <button onClick={pop}>pop</button>
      <button
        onClick={() => {
          listRef.current = [...list];
          console.log(listRef.current);
        }}
      >
        print
      </button>
      <button
        onClick={() => {
          // const newEle = document.createElement('div');
          // newEle.classList.add('extraNode');
          // const dom = render(<ExtraNode />, newEle)
          // createPortal(<h1>aaaa</h1>, document.body);
          // Toast('aaa');
          showToast();
        }}
      >
        addDom
      </button>
      <button
        onClick={() => {
          // const container = document.querySelector('.extraNode');
          // const node = unmountComponentAtNode(container);
          // console.log('node', node);
          // if (node && container) {
          //   container.remove();
          // }
          destoryToast();
        }}
      >
        destoryDom
      </button>
    </>
  );
};

export default Demo2;
