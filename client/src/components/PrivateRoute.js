import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { auth } = useAuth(); // Destructure 'auth' from the useAuth hook
  console.log("auth", auth); // Logs the entire auth object
  
  const userRole = auth?.role; // Assuming the role is stored within the 'auth' object

  console.log("userRole", userRole);
  console.log("allowedRoles", allowedRoles);

  // Ensure allowedRoles is an array, and check if the user's role is allowed
  if (!auth || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;





// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProtectedRoute = ({ allowedRoles = [], children }) => {
//   const { user ,a,b} = useAuth();
//   console.log("userRole",user,a,b)
//   const userRole = user?.role;

//   console.log("allowedroles",allowedRoles)
//   console.log("userRole",userRole)

//   // Ensure allowedRoles is an array
//   if (!Array.isArray(allowedRoles) || !allowedRoles.includes(userRole)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return children;
// };

// export default ProtectedRoute;














// import React, { useEffect } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// const PrivateRoute = ({ children, role }) => {
//   const user = JSON.parse(localStorage.getItem('users')) || null;
//   const location = useLocation();

//   useEffect(() => {
//     // Prevent navigation with browser buttons
//     window.history.pushState(null, null, location.pathname);
//     const handlePopState = () => {
//       window.history.pushState(null, null, location.pathname);
//     };
//     window.addEventListener('popstate', handlePopState);

//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, [location.pathname]);

//   // Validate role and restrict unauthorized access
//   if (!user || user.role !== role) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default PrivateRoute;

