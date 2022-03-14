import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import global styling
import './scss/global.sass';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
