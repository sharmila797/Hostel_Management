import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton, CircularProgress,
} from "@mui/material";
import { resolvePath, useNavigate } from "react-router-dom";
import {manualAuth,fetchUser} from "../services/auth/authServices";
import { fetchStudentDetails } from "../services/student/studentServices";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useAuth } from "../context/AuthContext";
import srm from "../Images/srm.png"; // Logo image
import srmist from "../Images/srmist.jpg"; // Background image
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const [userr, setUserr] = useState({ userid: "", password: "", showPassword: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const { login,auth } = useAuth();

  const handleLogin = async (e) => {
    if(e)
     e.preventDefault();// Prevent the default form submission behavior
    if (!userr.userid || !userr.password) {
      setError("Please enter both UserID and Password");
      return;
    }
    
    try {

if((userr.userid === 'admin')||(userr.userid === 'warden'))
{
      const response = await manualAuth(userr);
      //  const response = await fetchUser(user);
      console.log("response",response)
      if (response.data.success) {

        // const userData = response.data.data;
        // login(userData);
        // const role = userData.role;
        setIsAuthenticated(true);
                    setUser(response.data.user);
                    const role=response.data.user.role;
console.log("role",role)
        if (role === "Admin") {
          navigate("/admin-dashboard");
        } else if (role === "Warden") {
          navigate("/warden-dashboard");
        } 
        else {
          setError("Unauthorized Role");
        }
      } else {
        setError("Invalid UserID or Password");
      }
    }
    else{
      console.log("inside else",userr)
const response= await fetchStudentDetails(userr);
console.log("response student",response)
if (response.data.success) {

  // const userData = response.data.data;
  // login(userData);
  // const role = userData.role;
  setIsAuthenticated(true);
              setUser(response.data.user);
              const role=response.data.user.role;
console.log("role",role)
  if(role === "Student")
  {
    navigate("/student-dashboard")
  }
  else {
    setError("Unauthorized Role");
  }
} else {
  setError("Invalid UserID or Password");
}


    } }catch (err) {
      console.error("Login Error:", err);
      setError("Invalid UserID or Password");
    }finally{
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleClickShowPassword = () => {
    setUserr({
      ...userr,
      showPassword: !userr.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${srmist})`, // Fullscreen background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Login Card */}
      <Box
        sx={{
          mt:'8px',
          maxWidth: "350px",
          width: "70%",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <img src={srm} alt="SRM Logo" style={{ width: "70px", height: "70px" }} />
        </Box>

        {/* Title */}
        <Typography variant="h5" align="center" sx={{ fontWeight: "bold", mb: 4 }}>
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
              value={userr.userid}
              onChange={(e) => setUserr({ ...userr, userid: e.target.value })}
              sx={{
               
                mb: 2,
                '& label': {
                  color: '#554', // Default label color
                },
                '& label.Mui-focused': {
                  color: '#007bff', // Label color when focused
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#007bff', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#007bff', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#007bff', // Border color when focused
                  },
                  '& input': {
                    color: '#333', // Text color inside the input
                  },
                },
              }}
            />
          </Box>

         {/* Password Input */}
          <Box sx={{ mb: 5 }}>
          <TextField
  label="Password"
  type={userr.showPassword ? "text" : "password"}
  variant="outlined"
  fullWidth
  value={userr.password}
  onChange={(e) => setUserr({ ...userr, password: e.target.value })}
  onKeyDown={handleKeyPress}
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            size="small"
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {userr.showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
          </IconButton>
        </InputAdornment>
      ),
    },
  }}
  sx={{
               
    mb: 2,
    '& label': {
      color: '#554', // Default label color
    },
    '& label.Mui-focused': {
      color: '#007bff', // Label color when focused
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#007bff', // Default border color
      },
      '&:hover fieldset': {
        borderColor: '#007bff', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#007bff', // Border color when focused
      },
      '& input': {
        color: '#333', // Text color inside the input
      },
    },
  }}
/>
          </Box>

         {/* Login Button */}
                                           
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    sx={{
                                                        mt: 2,
                                                        mb: 2,
                                                        borderRadius: '8px',
                                                        bgcolor: '#1976d2',
                                                        textTransform: 'none',
                                                    }}
                                                    onClick={handleLogin}
                                                    disabled={loading}
                                                    startIcon={loading && <CircularProgress size={20} color="inherit" />}
                                                >
                                                    {loading ? 'Authenticating...' : 'Sign In'}
                                                </Button>
                                   
          {/* <Button variant="contained" color="primary" fullWidth sx={{borderRadius:'10px'}} onClick={handleLogin}>
            Login
          </Button> */}
      </Box>
    </Box>
  );
};

export default LoginForm;



































// import React, { useState } from 'react';
// import { TextField, Button, Typography, Container, Card, CardContent, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { fetchUser } from '../services/userlogin/userServices'; // Ensure this is correctly set up
// import srm from '../Images/srm.png';

// const LoginForm = () => {
//   const [user, setUser] = useState({ userid: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!user.userid || !user.password) {
//       setError('Please enter both UserID and Password');
//       return;
//     }

//     try {
//       const response = await fetchUser(user);
// console.log("response",response)
//       if (response.data.success) {
//         let role = response.data.data.role;
//         setError('');
//         alert('Login successful!');
//         if (role === 'Admin') {
//           navigate('/admin-dashboard');
//         } else if (role === 'Warden') {
//           navigate('/warden-dashboard');
//         } else {
//           setError('Unauthorized Role');
//         }
//       } else {
//         setError('Invalid UserID or Password');
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   const handleKeyPress=(e)=>{
//     console.log("key value",e.key)
//     if(e.key === 'Enter')
//     {
//       handleLogin();
//     }
//   }
//   return (
//     <Container maxWidth="xs" sx={{ display: 'flex',mt:15, minHeight: '50vh'}}>
//       <Card sx={{ width: '100%',borderRadius: '16px',  // Border radius for rounded corners
//   border: '1px solid #d1d5db',
//   boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Initial shadow
//   transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for both
//   '&:hover': {
//     transform: 'scale(1.05)', // Zoom-in effect on hover
//     boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.2)' // Enhance shadow on hover
//   },}}>
//         <CardContent>
//           {/* Logo Section */}
//           <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
//             <Box component="img" src={srm} alt="Logo" sx={{ width: 60, height: 60 }} />
//           </Box>

//           {/* Title */}
//           <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
//             Login
//           </Typography>

//           {/* Error Message */}
//           {error && (
//             <Typography color="error" variant="body2" align="center" sx={{ mb: 3 }}>
//               {error}
//             </Typography>
//           )}

//           {/* UserID Input */}
//           <Box sx={{ mb: 4 }}>
//             <TextField
//               label="UserID"
//               variant="outlined"
//               fullWidth
//               value={user.userid}
//               onChange={(e) => setUser({ ...user, userid: e.target.value })}
//               sx={{
               
//                 mb: 2,
//                 '& label': {
//                   color: '#555', // Default label color
//                 },
//                 '& label.Mui-focused': {
//                   color: '#007bff', // Label color when focused
//                 },
//                 '& .MuiOutlinedInput-root': {
//                   '& fieldset': {
//                     borderColor: '#ccc', // Default border color
//                   },
//                   '&:hover fieldset': {
//                     borderColor: '#007bff', // Border color on hover
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#007bff', // Border color when focused
//                   },
//                   '& input': {
//                     color: '#333', // Text color inside the input
//                   },
//                 },
//               }}
//             />
//           </Box>

//           {/* Password Input */}
//           <Box sx={{ mb: 7 }}>
//             <TextField
//               label="Password"
//               type="password"
//               variant="outlined"
//               fullWidth
//               value={user.password}
//               onChange={(e) => setUser({ ...user, password: e.target.value })}
//               onKeyDown={handleKeyPress} // Detect Enter key press
//               sx={{
//                 mb: 2,
//                 '& label': {
//                   color: '#555', // Default label color
//                 },
//                 '& label.Mui-focused': {
//                   color: '#007bff', // Label color when focused
//                 },
//                 '& .MuiOutlinedInput-root': {
//                   '& fieldset': {
//                     borderColor: '#ccc', // Default border color
//                   },
//                   '&:hover fieldset': {
//                     borderColor: '#007bff', // Border color on hover
//                   },
//                   '&.Mui-focused fieldset': {
//                     borderColor: '#007bff', // Border color when focused
//                   },
//                   '& input': {
//                     color: '#333', // Text color inside the input
//                   },
//                 },
//               }}
//             />
//           </Box>

//           {/* Login Button */}
//           <Button variant="contained" color="primary" fullWidth sx={{borderRadius:'10px'}} onClick={handleLogin}>
//             Login
//           </Button>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default LoginForm;






















