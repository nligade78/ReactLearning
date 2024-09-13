import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthProvider';

const PrivateRoute = ({ children, allowedAccess }) => {
  const { user } = useContext(AuthContext);

  return user?.access.includes(allowedAccess) ? children : <Navigate to="/not-authorized" />;
};

export default PrivateRoute;
