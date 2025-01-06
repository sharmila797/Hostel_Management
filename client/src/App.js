
import './App.css';
// import React,{useEffect} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext'
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard ';
import WardenDashboard from './components/WardenDashboard';
import ProtectedRoutes from './components/protectedRoutes';
import Unauthorized from './components/Unauthorized';



function App() {
  return (
    <AuthProvider>
    <Router>

      <Routes>
        <Route path="/" element={<LoginForm />} />

        {/* Admin Dashboard - Protected Route */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoutes role="Admin" allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />

        {/* Warden Dashboard - Protected Route */}
        <Route
          path="/warden-dashboard"
          element={
            <ProtectedRoutes role="Warden" allowedRoles={[ 'Warden']}>
              <WardenDashboard />
            </ProtectedRoutes>
          }
        />


<Route path="/unauthorized" element={<Unauthorized />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<LoginForm />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}
export default App;
