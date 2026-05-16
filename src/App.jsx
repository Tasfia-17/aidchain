import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import Platform from './pages/Platform';
import HowItWorks from './pages/HowItWorks';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;