import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './hooks/AuthProvider';
import ResponsiveAppBar from './hooks/ResponsiveAppBar';
import SearchNetwork from './Configuration/SearchNetwork';
import Configurations from './Configuration/Configurations';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import NotAuthorized from './components/NotAuthorized'; // Fallback page for unauthorized access

function App() {
  return (
    <AuthProvider>
      <ResponsiveAppBar />
      <Routes>
        <Route 
          path="/searchNetwork" 
          element={
            <PrivateRoute allowedAccess="SearchNetwork">
              <SearchNetwork />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/configurations" 
          element={
            <PrivateRoute allowedAccess="Configurations">
              <Configurations />
            </PrivateRoute>
          } 
        />
        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
