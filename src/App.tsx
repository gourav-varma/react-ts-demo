import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { ViewData } from './screens/ViewData'
import { HomePage } from './screens/HomePage'
import { UploadData } from './screens/UploadData'
import { Outlet } from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Outlet />}> */}
          <Route path="/" element={<Outlet />}>
          <Route index element={<HomePage />} />
          <Route path="viewData" element={<ViewData />} />
          <Route path="uploadData" element={<UploadData />} />
            {/* <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
