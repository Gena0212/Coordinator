// const { google } = require('googleapis');

import { google } from 'googleapis';
import express from "express";
import * as dotenv from 'dotenv'

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

const scopes = ['https://www.googleapis.com/auth/calendar'];

// OAuth 2 configuration
const oauth2Client = new google.auth.OAuth2
(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);


const calendar = google.calendar({
    version: 'v3', 
    auth: oauth2Client
});

app.get('/auth', (req, res) => {

    const url = oauth2Client.generateAuthUrl
    ({
        access_type: 'offline',
        scope: scopes
    });
    res.redirect(url);
    }
);

app.get("/auth/redirect", async (req, res) => {

    const {tokens} = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);
    res.send('Authentication successful! Please return to the console.');
    }

);

const event = {
    summary: 'Tech Talk with Arindam',
    location: 'Google Meet',

    description: "Demo event for Arindam's Blog Post.",
    start: {
        dateTime: "2024-03-14T19:30:00+05:30",
        timeZone: 'Asia/Kolkata'
    },
    end: {
        dateTime: "2024-03-14T20:30:00+05:30",
        timeZone: 'Asia/Kolkata'
    },
    attendees: [
        {email: 'gena.jey@gmail.com'},
    ]
};

app.get('/create-event', async (req, res) => {

    try {
        const result = await calendar.events.insert({
                                calendarId: 'primary', 
                                auth:oauth2Client,
                                resource: event
                        });

        res.send({
            status: 200,
            message: 'Event created',
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
    }
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});