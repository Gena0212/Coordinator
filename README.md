# Coordinator

## Overview

The coordinator app is a visual aid to help you coordinate meetup times with your friends! How? By combining your google calendars (with some built in privacy settings so that other people can only see when you are available and when you are not and no other information).

### Problem Space

In this day and age people are finding it difficult to find a time when they are all free. This app provides an easy visual of when everyone is available, making it easy to coordinate activities with multiple people.

### User Profile

The app user is any individual who wants any easy way to see when one or more people are available. The user will log into the app, and give the app access to their google calendar information. The app must be intuitive to any ordinary technology user.

### Features

The ability to create group with other app users. When the group is clicked on, a calendar will pop up which visually shows when all group members are free, only some members are free or no one is free. When a group is created, users added to the group will have to accept the invite into the group and give consent to some of their google calendar info being shared with others in the group.

A login and register page that stores data in a sql database.

### How To Install This Project

Clone the repository. Make sure to also clone the backend from the following respository: https://github.com/Gena0212/Coordinator-back-end.

You must set up a google developer console to run this project. To do this, go to https://console.cloud.google.com and login (or create an account if you do not already have one). After logging in create a project (should be able to do this by clicking the 'Select a project' button in the header'. When creating the project, you only need to add a name, you do not need to choose a location.

Open the side bar by clicking on the button with three horizontal lines and click 'APIs & Services'. Navigate to 'Enabled APIs and Services' and click 'Enable APIs and Services'. Search for Google Calendar API and enable it.

Click on OAuth consent screen on the side bar on the left side. Create a new OAuth consent screen, add a name and your email as the user support email and the developer contact information. Save and continue.

Click add or remove scopes and add https://www.googleapis.com/auth/calendar as your scope. Save and continue.

Add the email that you want to use when testing the project in Test Users. Note you can add multiple users, and as this project is based on users interacting with other users, I encourage you to add multiple emails to see the full scope of this project. Save and continue.

Next, on the left side bar, navigate to 'Credentials'. Click 'Create Credentials', then 'OAuth client ID'. Enter 'Web application' as the application type, no need to change the name. Under 'Authorized Javascript origins', add the URL of your frontend component (ex. http://localhost:5173). Add this URL to the .env file of your server component as your CLIENT_URL and with /callback at the end in your .env file in your client component as your REDIRECT_URI (ex.http://localhost:5173/callback).

Under 'Authorized redirect URIs', and your servers URL with /oauth/redirect attached to the end, also add this URL (ex. http://localhost:8000/oauth/redirect) to the .env file in your backend as your REDIRECT_URL. Click create. It may take a few hours for this setting to take effect, according to Google. It will then show you your Client ID and Client Secret, add these values to your .env file in both the client and server components.

Update the .env file in your server component by adding a PORT that matches the REDIRECT_URL, add a DB_NAME, DB_USER, DB_PASSWORD (after creating a sql database) and JWT_SECRET.

Add your API URL to your .env file in your client component as VITE_API_BASE_URL.

You can start the project by running npm start in the terminal of the backend component and npm run dev in the terminal of your frontend component.

## Implementation

### Tech Stack

Access google calendar data for each user using Google Calendar API. From past experience, may have issues connecting to the Google Calendar API. May have issues with access tokens and getting refresh tokens, security of the access token, and updating data from Google Calendar API instantly (this may not be possible).

React, HTML, CSS, Javascript for the frontend.

Full Calendar to implement a calendar component in the frontend.

Node, Express, MySql for the backend.

### APIs

Google Calendar API

### Sitemap

There will be a register and login page, where users must reigister using the email address associate with their google calendar.

After logging in, they will be prompted to give consent through google.

After consenting through google, users will then be direct to the home page, where they can see the groups they are currently in and groups that they are invited to. Clicking on any group they are in will navigate them to the Group Page.

In the group page, a calendar will be displayed, which shows the times when each member is available.

### Mockups

Home Page:
[Drawing (1).pdf](https://github.com/user-attachments/files/18472266/Drawing.1.pdf)

Group Page, where all members calendar info will be displayed:
[Drawing.sketchpad.pdf](https://github.com/user-attachments/files/18472307/Drawing.sketchpad.pdf)

### Data

One table of groups and the user ids of each group member.

A table for each user, with their unique user id, data from when they registered and calendar events pulled from Google API.

### Endpoints

Post request to register users. The body of this post request will be an object that has a first name, last name, password and email key.

A post request to sign in users, the body of this request will  have an object with an email key and a password key..

A post request to add a new group. The body of this post request will have the following key: group name and members. The members key will have an array of members added to the group.

A delete request to delete groups.

To get group data, including members and their events, there will need to be another get request. The group id wil be sent as a parameter. The response will be an object with the following keys: group name, group id number and members list.

To get invites for a user, another get request will be needed. The response will be an object which includes the following key: group name, group id, members.

There will need to be a post request to get user google calendar data from Google API and store it in the sql database.

## Roadmap

Mock up the front end of the project using dummy data. -do this during the holidays, should take a few days.

Attemp to connect to google API. -should take 2-3 days.

Find a way to prompt the user to give consent through the front end. -should take 1 day.

After connecting to google api, store events for each user in a sql database. -should take a few hours.

Build out the backend and the neccessary http requests/routes. -should take a day or two.

Test project and fix bugs - should take a day, do this a few days before the project is due.

Work on making the project visually appealing - do this the weekend before the capstone is due.

---

## Future Implementations

Include a feature where you can send an invite to all group members from the app itself.

Include a chat feature, like facebook messenger.

Create a profile page, a component for user settings.
