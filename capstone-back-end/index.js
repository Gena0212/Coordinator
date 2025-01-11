// const { google } = require('googleapis');

import { google } from "googleapis";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT || 8000;

const scopes = ["https://www.googleapis.com/auth/calendar"];

// OAuth 2 configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client,
});

app.get("/auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(url);
});

app.get("/auth/redirect", async (req, res) => {
  const { tokens } = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);
  res.send("Authentication successful! Please return to the console.");
});

app.get("/events", async (req, res) => {
  try {
    const result = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = result.data.items;

    
    if (!events || events.length === 0) {
        console.log("No upcoming events found.");
        return;
    } else {
        console.log(events);
    }

    res.send({
      status: 200,
      message: "Events fetched successfully",
    });

  } catch (error) {
    console.error(error);
  }
});



app.get("/create-event", async (req, res) => {
  try {
    const result = await calendar.events.insert({
      calendarId: "primary",
      auth: oauth2Client,
      resource: event,
    });

    res.send({
      status: 200,
      message: "Event created",
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
