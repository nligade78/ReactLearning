import React from 'react';
import { Card, CardContent } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ResponsiveCard = ({ children, ...props }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md')); // Large screen devices
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Small screen devices

  return (
    <Card
    // {...props}
      style={{
        width: '120%', // Take full width of the container
        margin: isSmallScreen ? '10px' : '20px auto', // Add some margin on small devices
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Light shadow for aesthetics
        maxWidth: isLargeScreen ? '100%' : '100%', // On large screens, take 90% width, otherwise 100%
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ResponsiveCard;
