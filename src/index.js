import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import TodoMVC from './TodoMVC';

ReactDOM.render(<TodoMVC />, document.getElementById('root'));
registerServiceWorker();
