import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ReportEditor } from './component/ReportEditor';

ReactDOM.render(
  <React.StrictMode>
    <ReportEditor reportId="2d195982-8e4e-4e02-87c8-02782e784aba" />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
