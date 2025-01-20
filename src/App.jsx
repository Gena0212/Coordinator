import { useState } from 'react'
import axios from "axios";
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import HomePage from './pages/HomePage/HomePage'
import GroupPage from './pages/GroupPage/GroupPage'
import GoogleLoginPage from './pages/GoogleLoginPage/GoogleLoginPage';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [groups, setGroups] = useState([]);

  const [formData, setFormData] = useState({
      email: "",
      password: "",
  });
  

  const apiURL = import.meta.env.VITE_API_BASE_URL
  const authToken = localStorage.getItem('authToken');

  const getUserData = async () => {
    try {
      // The user must be logged in to access this page and API endpoint.
      // Send a GET request to `/users/profile` along with the JWT token from localStroage as a header
      const { data } = await axios.get(
        `${apiURL}/users/profile`,
        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          }, 
        }
      );

      setUserData(data);
    } catch (error) {
      console.log(error)
    }
  };

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
        <Route path="/login" element={<LoginPage formData={formData} setFormData={setFormData} />} />
        <Route path='/google' element={<GoogleLoginPage formData={formData}/>}/>
        <Route path="/home" element={<HomePage userData={userData} getUserData={getUserData} groups={groups} fetchGroups={fetchGroups} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}/>
      <Route path="/calendar/:id" element={<GroupPage groups={groups} setIsModalOpen={setIsModalOpen} fetchGroups={fetchGroups}/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
