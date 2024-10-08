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
  const url = 'https://jsonplaceholder.typicode.com/users/1'; // Dummy Okta URL for testing

  useEffect(() => {
    // Call the API to check if the user is authenticated
    fetch(url, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === '') {
          setAuthenticated(false); // User is not authenticated
        } else {
          setUser(JSON.parse(data));
          setAuthenticated(true);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Automatically redirect to login page if not authenticated
    if (!loading && !authenticated) {
      window.location.href = url; // Redirect to the login page
    }
  }, [authenticated, loading]);

  useEffect(() => {
    // Redirect the user to the desired route if authenticated
    if (authenticated && user) {
      const urlRoute = location.pathname.substring(1);
      if (user.access.includes(urlRoute)) {
        navigate('/' + urlRoute, { replace: true });
      }
    }
  }, [navigate, authenticated, user, location]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator while checking authentication
  }

  if (!authenticated) {
    return null; // If not authenticated, let the effect handle the login redirect
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
