import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App/App';

// entry point for out React application
render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));

