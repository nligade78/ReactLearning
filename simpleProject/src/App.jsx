import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './Hooks/AuthProvider';
import ResponsiveAppBar from './Hooks/ResponsiveAppBar';
import SearchNetwork from './Configuration/SearchNetwork';
import Configurations from './Configuration/Configurations';

function App() {
  return (
    <AuthProvider>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/searchNetwork" element={<SearchNetwork/>} />
        <Route path="/configurations" element={<Configurations/>} />
        {/* Add other routes as needed */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
