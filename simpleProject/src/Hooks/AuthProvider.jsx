import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  const oktaLoginUrl = 'https://jsonplaceholder.typicode.com/users/1'; // Dummy Okta URL for testing

  useEffect(() => {
    setLoading(true);
    fetch(oktaLoginUrl, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === '') {
          setAuthenticated(false);
        } else {
          const userData = JSON.parse(data);
          setUser(userData);
          setAuthenticated(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false); // Ensure loading state is cleared even on error
      });
  }, [navigate]);

  useEffect(() => {
    // Redirect to the Okta login page if not authenticated and loading is done
    if (!authenticated && !loading) {
      window.location.href = oktaLoginUrl;
    }
  }, [authenticated, loading]);

  useEffect(() => {
    // Ensure `user` is available and check for access
    if (authenticated && user) {
      const urlRoute = location.pathname.substring(1, location.pathname.length);
      if (user.access && user.access.includes(urlRoute)) {
        navigate('/' + urlRoute, { replace: true });
      } else {
        // Handle the case where the user doesn't have access to the route
        navigate('/no-access', { replace: true });
      }
    }
  }, [navigate, location, authenticated, user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return null; // No UI to show, redirect is happening to Okta login
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
