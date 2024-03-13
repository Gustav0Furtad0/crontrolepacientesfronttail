import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/login';
import PacientePage from './pages/pacient';
import CalendarioPage from './pages/calendar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/paciente" element={<PacientePage />} />
        <Route path="/calendario" element={<CalendarioPage />} />
      </Routes>
    </Router>
  );
};

export default App;
