import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Signup } from './components/Signup';
import { Login } from './components/Login';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup></Signup>} />
        <Route path="/signin" element={<Login></Login>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
