import React, { FC, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './index.scss';

const getTemplate = (content, type = 'default') => {
  switch (type) {
    case 'loading': {
      return (
        <div className="plugin-pod-toast plugin-pod-toast--loading plugin-pod-toast--loading-style2  plugin-pod-toast__fullscreen">
          <div className="plugin-pod-loading plugin-pod-loading--circular plugin-pod-toast__loading">
            <span className="plugin-pod-loading__spinner plugin-pod-loading__spinner--circular">
              <svg
                className="plugin-pod-loading__circular"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3333 9.99999C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39762 18.3333 1.66666 14.6024 1.66666 9.99999C1.66666 5.39762 5.39762 1.66666 10 1.66666"
                  stroke="black"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          <div className="plugin-pod-toast__content plugin-pod-toast__text">
            {content}
          </div>
        </div>
      );
    }
    default: {
      return (
        <div className="plugin-pod-toast plugin-pod-toast__fullscreen">
          <div className="plugin-pod-toast__content plugin-pod-toast__inner">
            {content}
          </div>
        </div>
      );
    }
  }
};
interface IProps {
  visible: boolean;
  content?: string;
  duration?: number;
  onClose?: () => void;
}
const Toast: FC<IProps> = ({ visible, content, duration, onClose }) => {
  const [show, setShow] = useState(visible);
  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      onClose && onClose();
    }, duration || 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [visible]);
  return show ? createPortal(getTemplate(content), document.body) : <></>;
};

export default Toast;
