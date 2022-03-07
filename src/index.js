import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SearchPage from './SearchPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import ResultPage from './resultPage';
import RedirectElement from './redirectElement';
import MapPage from './mapPage'


ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<RedirectElement />} />
        <Route path="/app" element={<App />}>

          <Route path="result" element={<ResultPage />} />
          <Route path="searchByMap" element={<MapPage />} />
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
