import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom' //don't need to specify localhost url in axios http address
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
    <App />
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
