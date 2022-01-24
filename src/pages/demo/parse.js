const a = [];
const info = { dep: { url: 'xxxxxxee' }, url: 'parent' };
a.push(info);
const result = [info];
const allUrl = [];
while (result.length) {
  const ret = result.pop();
  allUrl.push(ret.url);
  if (ret.dep) {
    result.push(ret.dep);
  }
}
console.log('all', allUrl);

const node = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null,
    },
  },
};

function traverst(node) {
  if (node === null) return [];
  return (node.next !== null ? traverst(node.next) : []).concat([node.val]);
}

const ret = traverst(node);
console.log('ret', ret);

function to(promise, error) {
  return promise()
    .then((data) => [null, data])
    .catch((err) => {
      return [err, null];
    });
}

function failureTask() {
  return new Promise((resolve, reject) => {
    reject('failure');
  });
}

function successTask() {
  return new Promise((resolve, reject) => {
    resolve('success');
  });
}

async function runTask() {
  const [err, data] = await to(failureTask);
  const [err2, data2] = await to(successTask);
  console.log('err', err, err2, data, data2);
}

runTask();
