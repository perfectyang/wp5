import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
moment.locale('zh-cn');
import './index.scss';

const Entry = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  );
};

ReactDOM.render(<Entry />, document.querySelector('#root'));
