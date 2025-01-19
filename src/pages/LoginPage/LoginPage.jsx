import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from '../../components/LoginForm/LoginForm';
import googleButton from '../../assets/images/btn_google_signin_dark_pressed_web.png'


const LoginPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const apiURL = import.meta.env.VITE_API_BASE_URL


  useEffect(() => {
    // Function to extract authorization code from URL query parameters
    const getAuthorizationCode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      // if (code) { 
      //   // Exchange the authorization code for an access token
      //   exchangeAuthorizationCodeForAccessToken(code);
      // }
    };

    getAuthorizationCode();
  }, []);

  function navigate(url){
    window.location.href = url;
  }
  
  async function auth(){
    try {
      const response = await axios.post(`${apiURL}/request/${formData.email}`)
      console.log(response.data);
      navigate(response.data.url);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      {loggedIn ? (
        <button type="button" onClick={()=> auth()}>
              <img src={googleButton} alt='google sign in'/>
            </button>
      ) : (
        <>
          <h1>Login</h1>
          <LoginForm formData={formData} setFormData={setFormData} setLoggedIn={setLoggedIn} />
        </>
      )}
    </div>
  );
};

export default LoginPage;