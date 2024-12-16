import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom>
        403 - Unauthorized
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        You don't have permission to access this page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={goToHome}
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default Unauthorized;
