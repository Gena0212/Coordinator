import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

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
export const getCalendarEvents = async () => {
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

