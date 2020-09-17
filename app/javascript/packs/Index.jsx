import React from 'react';
import ReactDOM from 'react-dom';

import AuthenticationProvider from '../components/AuthenticationContext';
import App from '../components/App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>,
    document.getElementById('root'),
  )
})
