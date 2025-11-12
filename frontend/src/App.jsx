import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AppPage from './pages/AppPage';
import RegisterClientPage from './pages/RegisterClientPage';
import RegisterProfPage from './pages/RegisterProfPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<AppPage />} />
      <Route path="/registar-cliente" element={<RegisterClientPage />} />
      <Route path="/registar-profissional" element={<RegisterProfPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;