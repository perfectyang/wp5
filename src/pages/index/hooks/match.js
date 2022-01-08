// const a = 'abcdefg';
// const p = 'abc';

// const matchP = (s, p) => {
//   const check = (s, p, i, j) => {
//     console.log('i', i, j);
//     if (i >= p.length) {
//       return true;
//     }
//     if (s[i] === p[j]) {
//       return check(s, p, i + 1, j + 1);
//     } else {
//       return false;
//     }
//   };
//   return check(s, p, 0, 0);
// };

// const res = matchP(a, p);
// console.log('res', res);

// const readRecurse = (s) => {
//   const read = (s, i, str) => {
//     if (i > s.length - 1) {
//       return '';
//     } else {
//       const str = read(s, i + 1) + '' + s[i];
//       return str;
//     }
//   };
//   return read(s, 0, '');
// };
// const ret = readRecurse(a);
// console.log('ret', ret);

// [...Array(1000).keys()].forEach((key) => {
//   console.log(key);
// });
