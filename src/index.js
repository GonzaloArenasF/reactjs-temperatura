import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './componentes/app/App.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
