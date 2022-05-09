import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AppContent from './AppContent';
import NotFoundPage from './components/NotFoundPage';
import SuccessPage from './components/SucessPage';
import { Box } from '@mui/material';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Box sx={{ height: '2rem' }} />
    </BrowserRouter>
  );
};
export default App;
