import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AppContent from './AppContent';
import NotFoundPage from './components/NotFoundPage';
import SuccessPage from './components/SucessPage';
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <BrowserRouter>
      <Helmet>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.6/iframeResizer.contentWindow.min.js"
          type="text/javascript"
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
