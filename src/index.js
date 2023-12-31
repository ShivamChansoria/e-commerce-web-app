import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery';
import store from './components/Store';
import { Provider } from 'react-redux';
import { BrowserRouter} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import persistor from './components/Store';

$("button").click(function(){
  $.get("demo_test.asp", function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
  });
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
