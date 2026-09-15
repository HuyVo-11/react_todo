import React from 'react';
import { BrowserRouter } from 'react-router-dom'; //BrowserRouter là container lớn nhất của hệ thống routing// Routes là nơi chứa các route
import { TodoProvider } from './containers/todo/index';

import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TodoProvider>
  );
}

export default App;