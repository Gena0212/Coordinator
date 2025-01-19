import { useState } from 'react'
import axios from "axios";
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import HomePage from './pages/HomePage/HomePage'
import GroupPage from './pages/GroupPage/GroupPage'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  const apiURL = import.meta.env.VITE_API_BASE_URL
  const authToken = localStorage.getItem('authToken');

  const fetchGroups = async () => {
    try {
        const response = await axios.get(`${apiURL}/groups`, 
            {
                headers: {
                  authorisation: `Bearer ${authToken}`,
                },
            }
        )
        setGroups(response.data);

    } catch (error) {
        console.log(error)
    }
}

  return (
    <BrowserRouter>
    <div className='app'>
      <Routes>
        <Route path="/" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage isLoading={isLoading} setIsLoading={setIsLoading} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} groups={groups} fetchGroups={fetchGroups} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}/>
      <Route path="/calendar/:id" element={<GroupPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isLoading={isLoading} setIsLoading={setIsLoading} groups={groups} setIsModalOpen={setIsModalOpen} fetchGroups={fetchGroups}/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
