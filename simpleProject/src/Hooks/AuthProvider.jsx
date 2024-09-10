import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Avatar, Box, CssBaseline, ThemeProvider, Typography, Button, createTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const AuthContext = createContext();
const defaultTheme = createTheme();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // User is initially null
  const navigate = useNavigate();
  const location = useLocation();

  const url = 'http://localhost:3000/api/user'; // Replace with the actual Okta URL

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        if (data) {
          setUser({
            access: data.access || [],
            name: data.name,
            userName: data.userName || data.username, // dynamic based on received data
            given_name: data.given_name || data.name.split(' ')[0], // dynamic split if 'given_name' doesn't exist
            domainID: data.domainID || data.id,
            firstName: data.firstName || data.name.split(' ')[0],
            lastname: data.lastname || data.name.split(' ')[1] || '', // default empty string if no last name
            email: data.email,
          });
          setAuthenticated(true); // User is authenticated

          // Redirect to the page the user was trying to access, or default to '/'
          const from = location.state?.from?.pathname || '/';
          navigate(from, { replace: true });
        } else {
          setAuthenticated(false);
          navigate('/'); // Redirect if not authenticated
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setAuthenticated(false);
        navigate('/'); // Redirect in case of error
      } finally {
        setLoading(false); // Always set loading to false once the fetch is done
      }
    };

    fetchUserData();
  }, [navigate, location.state]);

  const login = () => {
    // Redirect to your authentication URL (Okta login or your custom login)
    window.location.href = 'http://localhost:3000/api/private';
  };

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
              Sign in via Okta
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <Button onClick={login}>Sign In</Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
