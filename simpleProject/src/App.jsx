import React from 'react';

// import Configurations from './Configuration/Configurations';
import Bright from './Bright/Bright';
 // Fallback page for unauthorized access

function App() {
  return (
    // <AuthProvider>
    <>
      {/* <ResponsiveAppBar />
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
      </Routes> */}

      <Bright></Bright>
      </>
    // </AuthProvider>
  );
}

export default App;
