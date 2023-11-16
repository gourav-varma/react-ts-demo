import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { ViewData } from './Pages/ViewData'
import { HomePage } from './Pages/HomePage'
import { AddDataExcel } from './Pages/AddDataExcel'
import { Outlet, Link } from "react-router-dom";
// import { MuiThemeProvider, createTheme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    // <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Outlet />}> */}
          <Route path="/" element={<Outlet />}>
          <Route index element={<HomePage />} />
          <Route path="viewdata" element={<ViewData />} />
          <Route path="addDataExcel" element={<AddDataExcel />} />
            {/* <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    // </MuiThemeProvider>
  );
}

export default App;
