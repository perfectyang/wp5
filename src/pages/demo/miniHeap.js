// 写一个最小堆
class MinHeap {
  constructor() {
    this.heap = [];
  }
  // 获取父节点
  getParentIndex(i) {
    // 取商 （i- 1）/2 等同于 Math.floor((i-1)/2)
    // 二进制数向右边移一位，这样刚好就是求商
    return (i - 1) >> 1;
  }
  // 获取左节点
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  // 交换两个数的方法
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  // 上移操作，最小堆，小的要在最上面
  shirtUp(index) {
    // 如果在堆顶，停止上移
    if (index == 0) return;
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shirtUp(parentIndex);
    }
  }
  // 下移操作
  shirtDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    // 左侧子节点小于当前节点
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shirtDown(leftIndex);
    }
    // 右侧子节点小于当前节点
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shirtDown(rightIndex);
    }
  }
  // [1, 3]
  // 插入 O(logK)
  insert(value) {
    this.heap.push(value);
    this.shirtUp(this.heap.length - 1);
  }
  // 删除堆顶
  pop() {
    // 用最后一个替换堆顶
    this.heap[0] = this.heap.pop();
    // 再下移
    this.shirtDown(0);
  }
  // 获取堆顶
  peek() {
    return this.heap[0];
  }
  // 获取大小
  size() {
    return this.heap.length;
  }
}

const heap = new MinHeap();
heap.insert(3);
heap.insert(2);
heap.insert(4);
heap.insert(1);
// heap.insert(6);
// heap.insert(5);
console.log(heap);
//    2
// 3     4
