import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "./styling/Charts.css"
//import $ from 'jquery';
//import Popper from 'popper.js';
//import "../node_modules/jquery/dist/jquery.min.js";
//import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import Charts from './components/Charts'
import HomePage from "./components/HomePage";

ReactDOM.render(

    <div className="container-fluid h-100">
        <HomePage/>
    </div>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
