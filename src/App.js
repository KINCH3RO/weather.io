import React from 'react';
import ResultPage from './resultPage';
import SideBar from './SideBar';
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="flex h-screen w-screen overflow-x-hidden bg-gray-50">

      <SideBar />
      <Outlet />

    </div>
  );
}

export default App;
