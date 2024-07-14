import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';

import MainProvider from './components/providers/mainProvider';
import Routes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainProvider>
      <Routes />
    </MainProvider>
  </React.StrictMode>
);
