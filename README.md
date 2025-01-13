
# Coordinator

## Overview

The coordinator app is a visual aid to help you coordinate meetup times with your friends! How? By combining your google calendars (with some built in privacy settings so that other people can only see when you are available and when you are not).

### Problem Space

In this day and age people are finding it difficult to find a time when they are all free. This app provides an easy visual of when everyone is available, making it easy to coordinate activities with multiple people.

### User Profile

The app user is any individual who wants any easy way to see when one or more people are available. The user will log into the app, and give the app access to their google calendar information. The app must be intuitive to any ordinary technology user.

### Features

The ability to create group with other app users. When the group is clicked on, a calendar will pop up which visually shows when all group members are free, only some members are free or no one is free. When a group is created, users added to the group will have to accept the invite into the group and give consent to some of their google calendar info being shared with others in the group. 

A login and register page that stores data in a sql database.

## Implementation

### Tech Stack

Access google calendar data for each user using Google Calendar API. From past experience, may have issues connecting to the Google Calendar API. May have issues with access tokens and getting refresh tokens, security of the access token, and updating data from Google Calendar API instantly (this may not be possible).

React, HTML, CSS, Javascript for the frontend.

Full Calendar to implement a calendar component in the frontend.

Node, Express, MySql for the backend.

### APIs

Google Calendar API

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

### Data

One table of groups and the user ids of each group member. 

A table for each user, with their unique user id and calendar events pulled from Google API. 


### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date. 

---

## Future Implementations
Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.
