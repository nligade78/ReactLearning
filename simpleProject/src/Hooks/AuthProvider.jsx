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

  // Fetch user data when the component mounts
  useEffect(() => {
    setLoading(true);
    fetch(url, {
      credentials: 'include', // This allows sending cookies for authentication
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((body) => {
        if (body === '') {
          setAuthenticated(false);
        } else {
          const userData = JSON.parse(body);
          setUser(userData);
          setAuthenticated(true);

          // Redirect based on access
          if (userData.access.includes('SearchNetwork')) {
            navigate('/searchNetwork', { replace: true });
          } else if (userData.access.includes('Configurations')) {
            navigate('/configurations', { replace: true });
          } else {
            navigate('/'); // Default route if no specific access
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setAuthenticated(false);
        setLoading(false);
        navigate('/'); // Redirect to homepage on error
      });
  }, [navigate]);

  // Effect to handle access changes after the user is set
  useEffect(() => {
    if (user) {
      setAuthenticated(true);
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

  // Generate initials from the user's name
  const getInitials = (name) => {
    if (!name) return '';
    const [firstName, lastName] = name.split(' ');
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
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
      <ThemeProvider theme={defaultTheme}>
        <Container>
          <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {getInitials(user?.name || user?.firstName || '')}
            </Avatar>
            <Typography sx={{ marginLeft: 2 }} variant="h6">
              {user?.name || user?.firstName || 'User'}
            </Typography>
          </Box>
          {children}
        </Container>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
