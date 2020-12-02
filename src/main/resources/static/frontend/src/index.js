import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './sass/styles.scss';
import Socket from './sockets/socket'
Socket.connect()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
