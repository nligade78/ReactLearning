import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider, { AuthContext } from './AuthProvider'; // Assuming AuthProvider is in the same folder
import SearchNetwork from './SearchNetwork'; // Your Search Network page
import Configurations from './Configurations'; // Your Configurations page
import ResponsiveAppBar from './ResponsiveAppBar'; // The Responsive AppBar

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ user }) => (
            <>
              {/* Render ResponsiveAppBar only when user is authenticated */}
              {user && <ResponsiveAppBar user={user} />}
              <Routes>
                <Route path="/searchNetwork" element={<SearchNetwork />} />
                <Route path="/configurations" element={<Configurations />} />
                {/* You can add more routes here */}
              </Routes>
            </>
          )}
        </AuthContext.Consumer>
      </Router>
    </AuthProvider>
  );
}

export default App;
