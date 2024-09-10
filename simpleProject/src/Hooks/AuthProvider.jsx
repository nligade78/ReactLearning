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

  const url = 'http://localhost:3000/api/user'; // Replace with the actual API URL

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
            userName: data.userName || data.username,
            given_name: data.given_name || data.name.split(' ')[0],
            domainID: data.domainID || data.id,
            firstName: data.firstName || data.name.split(' ')[0],
            lastname: data.lastname || data.name.split(' ')[1] || '',
            email: data.email,
          });
          setAuthenticated(true);

          // Redirect based on access
          if (data.access.includes('SearchNetwork')) {
            navigate('/searchNetwork', { replace: true });
          } else if (data.access.includes('Configurations')) {
            navigate('/configurations', { replace: true });
          } else {
            navigate('/'); // Default page if no specific access
          }
        } else {
          setAuthenticated(false);
          navigate('/'); // Redirect if not authenticated
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setAuthenticated(false);
        navigate('/'); // Redirect in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (!user) {
      setAuthenticated(false);
      setLoading(false);
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    } else {
      setAuthenticated(true);
      setLoading(false);
      // Redirect based on access if user is not on an allowed page
      if (user.access.includes('SearchNetwork') && location.pathname !== '/searchNetwork') {
        navigate('/searchNetwork', { replace: true });
      } else if (user.access.includes('Configurations') && location.pathname !== '/configurations') {
        navigate('/configurations', { replace: true });
      }
    }
  }, [user, location.pathname, navigate]);

  const login = () => {
    // Redirect to your API endpoint for authentication
    window.location.href = 'http://localhost:3000/api/private'; // Or your actual login endpoint
  };

  const handlePageChange = (page) => {
    if (page === 'SearchNetwork' && user.access.includes('SearchNetwork')) {
      navigate('/searchNetwork', { replace: true });
    } else if (page === 'Configurations' && user.access.includes('Configurations')) {
      navigate('/configurations', { replace: true });
    }
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
    <AuthContext.Provider value={{ user, handlePageChange }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
