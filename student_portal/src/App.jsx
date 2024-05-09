import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './routes/MainLayout';
import Admin from './pages/adminPage/Admin';
import Login from './pages/loginPage/Login';
import Student from './pages/studentPage/Student';
import Home from './pages/homePage/Home';
import Register from './pages/registerPage/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="login" element={<Login />} />
          <Route path="student" element={<Student />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
