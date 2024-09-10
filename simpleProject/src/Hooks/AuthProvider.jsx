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

  const url = ''; // Replace with the actual Okta URL

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
          setAuthenticated(true); // Assume authentication is successful for testing purposes
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
      if (user.access.includes('SearchNetwork') && location.pathname !== '/searchNetwork' && location.pathname !== '/configurations') {
        navigate('/searchNetwork', { replace: true });
      } else if (
        user.access.includes('Configurations') &&
        !user.access.includes('SearchNetwork') &&
        location.pathname !== '/configurations'
      ) {
        navigate('/configurations', { replace: true });
      }
    }
  }, [user, location.pathname, navigate]);

  const login = () => {
    window.location.href = '/login';
  };

  const handlePageChange = (page) => {
    // Manually navigate to the selected page
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
      {/* Example navigation controls */}
      {/* <Button onClick={() => handlePageChange('SearchNetwork')}>Go to Search Network</Button>
      <Button onClick={() => handlePageChange('Configurations')}>Go to Configurations</Button> */}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
