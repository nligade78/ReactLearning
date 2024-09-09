
// import React, { createContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Avatar, Box, CssBaseline, ThemeProvider, Typography, Button, createTheme } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// const AuthContext = createContext();
// const defaultTheme = createTheme();
// function AuthProvider({ children }) {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(undefined);
//   const navigate = useNavigate(); // Now correctly used within Router context
//   const url = 'https://jsonplaceholder.typicode.com/users/1'; // Dummy Okta URL for testing
//   useEffect(() => {
//     fetch(url, {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data) {
//           setUser(data); // Set the fetched user data
//           setAuthenticated(true); // Assume authentication is successful for testing purposes
//         } else {
//           setAuthenticated(false);
//           navigate('/'); // Redirect if not authenticated
//         }
//         setLoading(false);
//       });
//   }, [navigate]);
//   const login = () => {
//     window.location.href = url; // Dummy login URL for testing
//   };
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   if (!authenticated) {
//     return (
//       <ThemeProvider theme={defaultTheme}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign in via Okta
//             </Typography>
//             <Box component="form" sx={{ mt: 1 }}>
//               <Button onClick={login}>Sign In</Button>
//             </Box>
//           </Box>
//         </Container>
//       </ThemeProvider>
//     );
//   }
//   return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
// export { AuthContext };
// export default AuthProvider;



import React, { createContext, useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, Typography, createTheme, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Outlet, useNavigate } from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';

const AuthContext = createContext();

const oktaAuth = new OktaAuth({
  issuer: 'https://your-okta-domain.okta.com/oauth2/default', // Replace with your Okta domain
  clientId: 'your-client-id', // Replace with your Okta client ID
  redirectUri: window.location.origin + '/login/callback', // Replace with your redirect URI
});

const defaultTheme = createTheme();

function AuthProvider() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const session = await oktaAuth.session.get();
        if (session.status === 'ACTIVE') {
          const userInfo = await oktaAuth.token.getUserInfo();
          setUser(userInfo);
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuthentication();
  }, []);

  const login = () => {
    oktaAuth.signInWithRedirect();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in via Okta
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <Button variant="contained" color="primary" onClick={login}>
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, authenticated }}>
      <Outlet />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
