import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from '../../components/LoginForm/LoginForm';


const LoginPage = () => {
  const [accessToken, setAccessToken] = useState(null);


  useEffect(() => {
    // Function to extract authorization code from URL query parameters
    const getAuthorizationCode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        // Exchange the authorization code for an access token
        exchangeAuthorizationCodeForAccessToken(code);
      }
    };

    getAuthorizationCode();
  }, []);

  const exchangeAuthorizationCodeForAccessToken = async (code) => {
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', null, {
        params: {
          code,
          client_id: import.meta.env.VITE_APP_CLIENT_ID,
          client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
          redirect_uri: import.meta.env.VITE_APP_REDIRECT_URI,
          grant_type: 'authorization_code',
        },
      });

      console.log(response.data);
      const { access_token } = response.data;

      console.log(access_token);

      if (access_token) {
        // Store the access token securely (e.g., in localStorage or a backend server)
        setAccessToken(access_token);
        localStorage.setItem("access_token", access_token);
      }
    } catch (error) {
      console.error('Error exchanging authorization code for access token:', error);
    }
  };

  const handleLogin = () => {
    // Redirect to Google's OAuth 2.0 authorization endpoint
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${import.meta.env.VITE_APP_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_APP_REDIRECT_URI}&response_type=code&scope=${import.meta.env.VITE_APP_SCOPES}`;
  };

  return (
    <div>
      <h1>Login</h1>
      {accessToken ? (
        <div>
          <p>Logged in successfully!</p>
        </div>
      ) : (
        <LoginForm/>
      )}
    </div>
  );
};

export default LoginPage;