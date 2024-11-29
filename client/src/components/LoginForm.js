import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../services/userlogin/userServices'; // Ensure this points to your correct API service

const LoginForm = () => {
  const [user, setUser] = useState({ userid: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!user.userid || !user.password) {
      setError('Please enter both userid and password');
      return;
    }

    try {
      // Log user details to console (for debugging)
      console.log('User details:', user);

      // API call to validate the user credentials
      const response = await fetchUser(user);

      // Check if the response is successful
      if (response.data.success) {
        setError(''); // Clear previous error messages
        alert('Login successful!');
        navigate('/admin-dashboard'); // Redirect to the admin dashboard
      } else {
        setError('Invalid userid or password');
      }
    } catch (err) {
      // Handle any errors that occur during the API request
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          label="UserID"
          variant="outlined"
          fullWidth
          value={user.userid}
          onChange={(e) => setUser({ ...user, userid: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
