import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "tachyons";

ReactDOM.render(<App className="App"/>, document.getElementById('root'));
serviceWorker.unregister();
