import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SearchPage from './SearchPage';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import SideBar from './SideBar';
import ResultPage from './resultPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/App" element={<App />}>
        
            <Route path="result" element={<ResultPage />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
