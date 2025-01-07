import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { getCalendarEvents } from '../../utils/calendar'; // Import the getCalendarEvents function


const Login = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState(null)

  console.log(accessToken);

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

      const { access_token } = response.data;

      if (access_token) {
        // Store the access token securely (e.g., in localStorage or a backend server)
        setAccessToken(access_token);
        localStorage.setItem("access_token", access_token);
        console.log(localStorage.getItem("access_token"));
        console.log(typeof localStorage.getItem("access_token"))

        // Fetch calendar events
        // const events = await getCalendarEvents();
        // console.log(events)
        // setCalendarEvents(events);
      }
    } catch (error) {
      console.error('Error exchanging authorization code for access token:', error);
    }
  };

  const handleLogin = () => {
    // Redirect to Google's OAuth 2.0 authorization endpoint
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${import.meta.env.VITE_APP_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_APP_REDIRECT_URI}&response_type=code&scope=${import.meta.env.VITE_APP_SCOPES}`;
  };

  console.log(accessToken)

  return (
    <div>
      <h1>Login</h1>
      {accessToken ? (
        <div>
          <p>Logged in successfully!</p>
          <h2>Upcoming Events</h2>
          {/* <ul>
            {calendarEvents.map((event) =>

 (
              <li key={event.id}>{event.summary}</li>
            ))}
          </ul> */}
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default Login;