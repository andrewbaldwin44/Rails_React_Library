import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'redux/store';
import AuthenticationProvider from 'components/AuthenticationContext';
import App from 'App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </Provider>,
    document.getElementById('root'),
  );
});
