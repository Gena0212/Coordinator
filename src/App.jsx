import { useState } from 'react'
import axios from "axios";

import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import googleButton from './assets/btn_google_signin_dark_pressed_web.png'

function App() {

  function navigate(url){
    window.location.href = url;
  }
  
  async function auth(){
    try {
      const response = await axios.post('http://localhost:8000/request')

      console.log(response.data);
      navigate(response.data.url);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>  
      <button type="button" onClick={()=> auth()}>
            <img src={googleButton} alt='google sign in'/>
      </button>
    </>
  )
}

export default App
