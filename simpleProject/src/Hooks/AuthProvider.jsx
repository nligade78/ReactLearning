import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material';

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
    // Check if the user is authenticated
    const checkAuthentication = async () => {
      try {
        const response = await fetch(url, {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data) {
            setUser(data);
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching authentication status:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [url]);

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (!loading && !authenticated) {
      window.location.href = url; // Redirect to the login page
    }
  }, [authenticated, loading, url]);

  useEffect(() => {
    // Redirect the user to the desired route if authenticated
    if (authenticated && user) {
      const urlRoute = location.pathname.substring(1);
      if (user.access && user.access.includes(urlRoute)) {
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
