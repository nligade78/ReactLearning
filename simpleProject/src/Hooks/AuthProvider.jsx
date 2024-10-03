import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

const AuthContext = createContext();
const defaultTheme = createTheme();

function AuthProvider({ children }) { // Ensure children is correctly destructured here
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
          setUser(JSON.parse(body));
          setAuthenticated(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setAuthenticated(false);
        setLoading(false);
      });
  }, [setAuthenticated, setLoading, setUser]);

  // Redirect to the appropriate route based on user access or to the login page
  useEffect(() => {
    if (authenticated) {
      const urlRoute = location.pathname.substring(1, location.pathname.length);
      if (user.access.includes(urlRoute)) {
        navigate('/' + urlRoute, { replace: true });
      }
    } else if (loading === false) {
      // If not authenticated and loading is complete, redirect to Okta login page
      window.location.href = 'http://localhost:3000/api/private'; // Redirect to the Okta login page
    }
  }, [authenticated, loading, location.pathname, navigate, user.access]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      {children} {/* Render children if authenticated */}
    </ThemeProvider>
  );
}

export { AuthContext };
export default AuthProvider;
