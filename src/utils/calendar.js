import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
console.log(google)
const OAuth2 = google.auth.OAuth2;

const SCOPES = new GoogleAuth(['https://www.googleapis.com/auth/calendar.readonly']);

// Initialize the OAuth2 client
const oauth2Client = new OAuth2(
  import.meta.env.VITE_APP_CLIENT_ID,
  import.meta.env.VITE_APP_CLIENT_SECRET,
  import.meta.env.VITE_APP_REDIRECT_URI
);

// Set the access token
oauth2Client.setCredentials({
  access_token: localStorage.getItem("access_token"),
});

// Create a new Calendar API instance
const calendar = google.calendar({
  version: 'v3',
  auth: oauth2Client,
});

// Function to fetch calendar events
const getCalendarEvents = async () => {
  console.log('testing')
  try {
    const response = await calendar.events.list({
      calendarId: 'primary', // Use 'primary' for the user's primary calendar
      timeMin: new Date().toISOString(),
      maxResults: 10, // Maximum number of events to fetch
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items;

    return events;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
};

export default getCalendarEvents;

