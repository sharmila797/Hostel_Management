import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loading from '../utils/Loading';

const ProtectedRoutes = ({allowedRoles=[],children}) => {
    const {isAuthenticated, loading, user } = useContext(AuthContext);
    console.log("User", user);
    console.log("loading", loading);
    console.log("Auth", isAuthenticated);

    if(loading){
        return <div><Loading/></div>
    }

    if(!user || !isAuthenticated){
        return <Navigate to= "/" replace />
    }

    if(!allowedRoles.includes(user.role)){
        return <Navigate to='/unauthorized' replace />
    }


    return children;
};

export default ProtectedRoutes;





















// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProtectedRoute = ({ allowedRoles = [], children }) => {
//   const { auth } = useAuth(); // Destructure 'auth' from the useAuth hook

//   console.log("auth values",auth)
//   const userRole = auth?.role; // Assuming the role is stored within the 'auth' object

//   // If user is not authenticated or doesn't have the correct role, redirect to login page
//   if (!auth || !allowedRoles.includes(userRole)) {
//     return <Navigate to="/" />;
//   }

//   return children; // Render children if authorized
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

