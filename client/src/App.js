import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard ';
import WardenDashboard from './components/WardenDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={ <LoginForm/>}/>
   <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
   <Route path="/warden-dashboard" element={<WardenDashboard/>}/>
    </Routes>
    </Router>
  );
}

export default App;
