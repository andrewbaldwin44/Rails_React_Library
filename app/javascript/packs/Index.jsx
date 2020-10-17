import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from "../store";
import AuthenticationProvider from '../components/AuthenticationContext';
import App from '../components/App';

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </Provider>,
    document.getElementById('root'),
  )
})
