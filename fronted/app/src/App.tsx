import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Dashboard } from './page/Dashboard';
import { Profile } from './page/Profile';
import { Signup } from './page/Signup';
import { Login } from './page/Login';
import { Chat } from './page/Chat';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup></Signup>} />
        <Route path="/signin" element={<Login></Login>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat></Chat>} />
      </Routes>
    </Router>
  );
};

export default App;
