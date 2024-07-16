import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Profile } from './page/Profile';
import { Signup } from './page/Signup';
import { Login } from './page/Login';
import { History } from './page/History';
import { Landing } from './page/Landingpage';
import DoctorDetails from './page/DoctorDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing></Landing>} />
        <Route path="/signup" element={<Signup></Signup>} />
        <Route path="/signin" element={<Login></Login>} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/history' element={<History></History>}></Route>
        <Route path='doctor/:id' element={<DoctorDetails></DoctorDetails>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
