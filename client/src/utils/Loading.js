import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

// Loading Component
const Loading = ({ message = "Loading...", size = 40 }) => {

    const [progress, setProgress] = useState(0); 

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
      }, 800);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"  // Full page height
    >
      {/* Circular spinner */}
      <CircularProgress size={size} value={progress} />

      {/* Optional message below the spinner */}
      {message && (
        <Typography
          variant="h6"
          sx={{ marginTop: 2, color: 'text.secondary' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loading;