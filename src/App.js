import './App.css';
import './component/Login.css';
import React from 'react'
import Navbar from './component/Navbar';
import Main from './component/Main';
import Login from './component/Login';
import Signup from './component/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
import Mypage from './component/Mypage';
import Mentoring from './component/Mentoring';
import Program from './component/Program';
import { RecoilRoot } from 'recoil';
import PrivateRoute from './component/PrivateRoute';
import PublicRoute from './component/PublicRoute';






function App() {



  return (
    <RecoilRoot><BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element={<Main/>} />
    <Route path="/login" element={<PublicRoute component={<Login/>} />} />
    <Route path="/signup" element={<PublicRoute component={<Signup/>} />} />
    <Route path="/users" element={<Users/>} />
    <Route path="/mypage" element={<PrivateRoute component={<Mypage/>} />}/>
    <Route path="/mentoring" element={<Mentoring/>} />
    <Route path="/program" element={<Program/>} />


    </Routes>
    </BrowserRouter></RecoilRoot>
  );
}

export default App;
