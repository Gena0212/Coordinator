import { useState } from 'react'
import axios from "axios";

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import HomePage from './pages/HomePage/HomePage'
import GroupPage from './pages/GroupPage/GroupPage'
import googleButton from './assets/btn_google_signin_dark_pressed_web.png'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/calendar/:id" element={<GroupPage/>} />
      </Routes>
    </BrowserRouter>
    
    
  )
}

export default App
