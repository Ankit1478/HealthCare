import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Profile } from './page/Profile';
import { Signup } from './page/Signup';
import { Login } from './page/Login';
import { Chat } from './page/Chat';
import Dashboard from './page/Dashboard';
import { History } from './page/History';
import { Landing } from './page/Landingpage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing></Landing>} />
        <Route path="/signup" element={<Signup></Signup>} />
        <Route path="/signin" element={<Login></Login>} />
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat></Chat>} />
        <Route path='/history' element={<History></History>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
