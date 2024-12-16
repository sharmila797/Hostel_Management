
import './App.css';
// import React,{useEffect} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext'
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard ';
import WardenDashboard from './components/WardenDashboard';
import PrivateRoute from './components/PrivateRoute';
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
            <PrivateRoute role="Admin" allowedRoles={['Admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Warden Dashboard - Protected Route */}
        <Route
          path="/warden-dashboard"
          element={
            <PrivateRoute role="Warden" allowedRoles={[ 'Warden']}>
              <WardenDashboard />
            </PrivateRoute>
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
