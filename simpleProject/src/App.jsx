// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Configurations from './Configuration/Configurations';
// import ResponsiveAppBar from './appBar/ResponsiveAppBar';
// import SearchNetwork from './Configuration/SearchNetwork';
// import AuthProvider from './Hooks/AuthProvider';


// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <ResponsiveAppBar />
//         <Routes>
//           <Route path="/" element={<SearchNetwork />} />
//           <Route path="/configurations" element={<Configurations />} />
//           <Route path="/searchNetwork" element={<SearchNetwork />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import React from 'react';


import AuthProvider from './Hooks/AuthProvider';
import ResponsiveAppBar from './Hooks/ResponsiveAppBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchNetwork from './Configuration/SearchNetwork';
import Configurations from './Configuration/Configurations';
function App() {
  return (
    <AuthProvider>
      <ResponsiveAppBar />
      <Routes>
          <Route path="/" element={<SearchNetwork />} />
           <Route path="/configurations" element={<Configurations />} />
           <Route path="/searchNetwork" element={<SearchNetwork />} />
        </Routes>
       
    </AuthProvider>
  );
}

export default App;
