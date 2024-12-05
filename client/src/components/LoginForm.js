import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Card, CardContent, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../services/userlogin/userServices'; // Ensure this is correctly set up
import srm from '../Images/srm.png';

const LoginForm = () => {
  const [user, setUser] = useState({ userid: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!user.userid || !user.password) {
      setError('Please enter both UserID and Password');
      return;
    }

    try {
      const response = await fetchUser(user);
console.log(response)
      if (response.data.success) {
        const role = response.data.data.role;
        setError('');
        alert('Login successful!');
        if (role === 'Admin') {
          navigate('/admin-dashboard');
        } else if (role === 'Warden') {
          navigate('/warden-dashboard');
        } else {
          setError('Unauthorized Role');
        }
      } else {
        setError('Invalid UserID or Password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleKeyPress=(e)=>{
    console.log("press key",e)
    if(e.key === 'Enter')
    {
      handleLogin();
    }
  }
  return (
    <Container maxWidth="xs" sx={{ display: 'flex',mt:15, minHeight: '50vh'}}>
      <Card sx={{ width: '100%',borderRadius: '8px',  // Border radius for rounded corners
  border: '1px solid #d1d5db',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Initial shadow
  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for both
  '&:hover': {
    transform: 'scale(1.05)', // Zoom-in effect on hover
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.2)' // Enhance shadow on hover
  },}}>
        <CardContent>
          {/* Logo Section */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box component="img" src={srm} alt="Logo" sx={{ width: 60, height: 60 }} />
          </Box>

          {/* Title */}
          <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
            Login
          </Typography>

          {/* Error Message */}
          {error && (
            <Typography color="error" variant="body2" align="center" sx={{ mb: 3 }}>
              {error}
            </Typography>
          )}

          {/* UserID Input */}
          <Box sx={{ mb: 4 }}>
            <TextField
              label="UserID"
              variant="outlined"
              fullWidth
              value={user.userid}
              onChange={(e) => setUser({ ...user, userid: e.target.value })}
            />
          </Box>

          {/* Password Input */}
          <Box sx={{ mb: 7 }}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              onKeyDown={handleKeyPress} // Detect Enter key press
            />
          </Box>

          {/* Login Button */}
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginForm;






















// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography, Container } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { fetchUser } from '../services/userlogin/userServices'; // Ensure this points to your correct API service

// const LoginForm = () => {
//   const [user, setUser] = useState({ userid: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!user.userid || !user.password) {
//       setError('Please enter both userid and password');
//       return;
//     }

//     try {
//       // Log user details to console (for debugging)
//       console.log('User details:', user);

//       // API call to validate the user credentials
//       const response = await fetchUser(user);

// let Role=response.data.data,role
//       // Check if the response is successful
//       if (response.data.success) {
//         setError(''); // Clear previous error messages
//         alert('Login successful!');
//         if(Role === "Admin")
//         {
//           navigate('/admin-dashboard'); // Redirect to the admin dashboard
//         }
//         else{
//           navigate('/warden-dashboard');
//         }
       
//       } else {
//         setError('Invalid userid or password');
//       }
//     } catch (err) {
//       // Handle any errors that occur during the API request
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
//         <Typography variant="h5" sx={{ mb: 2 }}>
//           Login
//         </Typography>
//         {error && (
//           <Typography color="error" variant="body2" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}
//         <TextField
//           label="UserID"
//           variant="outlined"
//           fullWidth
//           value={user.userid}
//           onChange={(e) => setUser({ ...user, userid: e.target.value })}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           fullWidth
//           value={user.password}
//           onChange={(e) => setUser({ ...user, password: e.target.value })}
//           sx={{ mb: 2 }}
//         />
//         <Button variant="contained" fullWidth onClick={handleLogin}>
//           Login
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default LoginForm;
