import React from 'react';
import { unmountComponentAtNode, render, createPortal } from 'react-dom';
import ToastBox from './Toast';

const containers: HTMLDivElement[] = [];
function unmount(container: HTMLDivElement) {
  const unmountResult = unmountComponentAtNode(container);
  if (unmountResult && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}
function clear() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const container = containers.pop();
    if (!container) break;
    unmount(container);
  }
}
interface IToast {
  duration?: number;
  onClose?: () => void;
}

const Toast = (content = '', options: IToast = {}) => {
  const { onClose } = options;
  const container = document.createElement('div');
  clear();
  containers.push(container);
  options.onClose = () => {
    unmountComponentAtNode(container);
    onClose?.();
  };

  render(<ToastBox content={content} visible={true} {...options} />, container);
};

const cacheContainer = [];

const Modal = () => {
  const node = createPortal(<h2>heeelo</h2>, document.body);
  console.log('node', node);
  return node;
};

export function showToast() {
  const container = document.createElement('div');
  cacheContainer.push(container);
  render(<Modal />, container);
}

export function destoryToast() {
  const container = cacheContainer.pop();
  unmountComponentAtNode(container);
}
export default Toast;
