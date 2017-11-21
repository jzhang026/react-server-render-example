import React from 'react';
import ReactDOM from 'react-dom'
import App from './App.js'

ReactDOM.render(
  <App {...window.APP_PROPS}/>,
  document.getElementById('content')
)