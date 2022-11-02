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


function App() {


  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element={<Main/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/users" element={<Users/>} />
    <Route path="/mypage" element={<Mypage/>} />
    <Route path="/mentoring" element={<Mentoring/>} />
    <Route path="/program" element={<Program/>} />


    </Routes>
    </BrowserRouter>
  );
}

export default App;
