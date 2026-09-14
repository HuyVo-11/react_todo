import React from 'react';
import { BrowserRouter } from 'react-router-dom'; //BrowserRouter là container lớn nhất của hệ thống routing// Routes là nơi chứa các route

import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;