import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from '../../components/LoginForm/LoginForm';


const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


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
      const response = await axios.post(`http://localhost:8000/request/${formData.email}`)

      console.log(response.data);
      navigate(response.data.url);
    } catch (error) {
      console.log(error)
    }
  }

  // const exchangeAuthorizationCodeForAccessToken = async (code) => {
  //   try {
  //     const response = await axios.post('https://oauth2.googleapis.com/token', null, {
  //       params: {
  //         code,
  //         client_id: import.meta.env.VITE_APP_CLIENT_ID,
  //         client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
  //         redirect_uri: import.meta.env.VITE_APP_REDIRECT_URI,
  //         grant_type: 'authorization_code',
  //       },
  //     });

  //     console.log(response.data);
  //     const { access_token } = response.data;

  //     console.log(access_token);

  //     if (access_token) {
  //       // Store the access token securely (e.g., in localStorage or a backend server)
  //       localStorage.setItem("access_token", access_token);
  //     }
  //     setLoggedIn(true)
  //   } catch (error) {
  //     console.error('Error exchanging authorization code for access token:', error);
  //   }
  // };

  // const handleLogin = () => {
  //   // Redirect to Google's OAuth 2.0 authorization endpoint
  //   window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${import.meta.env.VITE_APP_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_APP_REDIRECT_URI}&response_type=code&scope=${import.meta.env.VITE_APP_SCOPES}&hd=${formData.email}`;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("You must provide a username and a password");
      return;
    }

    // Check the format of the email address via a regular expression
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("The email address is not valid. Expected format: x@x.xx");
      return;
    }

    try {
      // To login, send a POST request to the `/users/login` endpoint
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // To ensure the frontend stays logged in, store the JWT in localStorage
      localStorage.setItem("authToken", data.authToken);

      setLoggedIn(true);
      // setTimeout(() => {
      //   navigate("/profile");
      // }, 2000);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
};

  return (
    <div>
      <h1>Login</h1>
      {loggedIn ? (
            <button type="button" onClick={()=> auth()}>
              <img src={googleButton} alt='google sign in'/>
            </button>
      ) : (
        <LoginForm errorMessage={errorMessage} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}/>
      )}
    </div>
  );
};

export default LoginPage;