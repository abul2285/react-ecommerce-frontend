import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
