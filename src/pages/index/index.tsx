// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import App from './App';

// // ReactDOM.resznder(<App />, document.querySelector('#root'));
// // type MyPick<T, K extends keyof T> = {
// //   [P in K]: T[P]
// // }

// type MyPick<T, P extends keyof T> = {
//   [K in P]: T[K];
// };

// const mp = {
//   name: 'js',
//   age: 1,
// };
// // 'name' | 'age' 属于数组类型,即keyof 类型
// type newPIck = MyPick<typeof mp, 'name' | 'age'>;
// const np: newPIck = {
//   name: 'ssss',
//   age: 1,
// };

// type MyReadonly<T> = {
//   readonly [P in keyof T]: T[P];
// };

// interface Todo {
//   title: string;
//   description: string;
// }

// const todo: MyReadonly<Todo> = {
//   title: 'Hey',
//   description: 'foobar',
// };

// todo.title = 'Hello';

// type onlyString<T> = {
//   [P in keyof T]: string;
// };

// type TupleToObject<T extends readonly string[]> = {
//   [P in T[number]]: P;
// };

// const tuple = ['tesla'] as const;
// type result = TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

// const a: result = {
//   tesla: 'tesla',
// };

// interface IPerson {
//   name: string;
//   age: number;
// }

// function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
//   return o[name];
// }

// const person: IPerson = {
//   name: '111',
//   age: 111,
// };

// type keys = 'name' | 'age';

// type Ikeys = {
//   [K in keys]: K;
// };
// const mykeys: Ikeys = {
//   name: 'name',
//   age: 'age',
// };

// const k: string = getProperty(person, 'name');

// const arr = ['title', 'js', 'age'] as const;
// // const arr = { title: 'aa', js: 'b', age: 'c' } as const;

// type Loop<T extends readonly any[]> = {
//   [P in T[number]]: P;
// };

// type rr = Loop<typeof arr>;

// interface Todo {
//   title: string;
//   description: string;
// }
// // omit

// type MyPartial<T> = {
//   [P in keyof T]?: T[P] | undefined;
// };

// type MyRecord<T extends keyof any, U> = {
//   [P in T]: U;
// };

// type Coord = MyRecord<'x' | 'y', number>;
// const tp: Coord = {
//   x: 1,
//   y: 1,
// };

// // 等同于
// // type Coord = {
// // 	x: number;
// // 	y: number;
// // }
// interface Todo {
//   title: string;
//   description: string;
//   completed: boolean;
//   createdAt: number;
// }

// type MyExclude<T, U> = T extends U ? never : T;

// type more = MyExclude<'a' | 'b' | 'd' | 'c', 'a' | 'b'>;
// const testMore: more = 'c';

// type exclude<T, U> = T extends U ? never : T;
// type include<T, U> = T extends U ? T : never;

// type MyOmit<T, U extends keyof T> = {
//   [P in exclude<keyof T, U>]: T[P];
// };

// type MyPickOmit<T, U extends keyof T> = {
//   [P in include<keyof T, U>]: T[P];
// };

// type TodoPreview = MyPickOmit<Todo, 'description' | 'title' | 'createdAt'>;
// const ass: TodoPreview = {
//   completed: true,
// };

// type DeepReadonly<T> = {
//   readonly [K in keyof T]: T[K] extends Object
//     ? T[K] extends Function
//       ? T[K]
//       : DeepReadonly<T[K]>
//     : T[K];
// };
// type Arr = ['1', '2', '3'];

// type TupleToUnion<T extends string[]> = T[number];

// type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'

// type chainable<T> = {
//   get(): T,
//   option<K extends string, V = unknown>(name: Exclude<K, keyof T>, value: V): chainable<T & Record<K, V>>
// }

// type newChanin = chainable<{name: string; value: string}>

// const result = configFn
//   .option('foo', 123)
//   .option('name', 'type-challenges')
//   .option('bar', { value: 'Hello World' })
//   .get()
const a = () => {
  return new Promise<API.RESPONSE<{ name: string }>>((resolve, reject) => {
    resolve({
      code: '111',
      data: {
        name: 'string',
      },
      message: 'aaa',
      success: false,
    });
  });
};

type a = 'a' | 'c';
type d = 'b' | 'a';

interface A {
  name?: string;
}
interface B {
  age: string;
}

interface C extends A, B {
  text: string;
}

const cccc: C = {
  age: '222',
  text: 'aaa',
  name: 'bbbb',
};

type c = a extends d ? a : never;
