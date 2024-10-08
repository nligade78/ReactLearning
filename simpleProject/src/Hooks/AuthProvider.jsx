import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Avatar, Box, CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const AuthContext = createContext();
const defaultTheme = createTheme();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const oktaUrl = 'https://jsonplaceholder.typicode.com/users/1'; // Dummy Okta login URL
  const loginUrl = 'https://jsonplaceholder.typicode.com/users/1'; // Dummy login page URL

  // Automatically redirect to Okta login if not authenticated
  useEffect(() => {
    setLoading(true);
    fetch(oktaUrl, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((body) => {
        if (body === '') {
          setAuthenticated(false);
          window.location.href = loginUrl; // Redirect to Okta login if not authenticated
        } else {
          const userData = JSON.parse(body);
          if (userData.verified) { // Add verification check here
            setUser(userData);
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
            window.location.href = loginUrl; // Redirect if not verified
          }
        }
        setLoading(false);
      });
  }, [setAuthenticated, setUser]);

  // Redirect to the appropriate page based on user access rights
  useEffect(() => {
    const urlRoute = location.pathname.substring(1);
    if (authenticated && user?.access.includes(urlRoute)) {
      navigate(`/${urlRoute}`, { replace: true });
    }
  }, [authenticated, user, location, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Redirecting to Okta Login...
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export { AuthContext };
export default AuthProvider;
