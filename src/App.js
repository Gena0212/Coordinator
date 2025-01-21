import './App.css'
import React, {useEffect, useState } from 'react'
import {gapi} from 'gapi-script'
import EventItem from "./components/EventItem.js"

function App() {
  

  const calendarID= process.env.CALENDAR_ID
  const apiKey = process.env.GOOGLE_API_KEY
  const accessToken = process.env.GOOGLE_ACCESS_TOKEN

  const getGoogleCalendarEvents = (calendarID, apiKey) => {
    function initiate() {
        gapi.client
            .init({
                apiKey: apiKey,
            })

            .then(function () {
                return gapi.client.request({
                    path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
                })
            })

            .then(
                (response) => {
                    let calendar_events = response.result.items
                    return calendar_events
                },
                function (err) {
                    return [false, err]
                }
            )
    }

    gapi.load('client', initiate)
  }


  return (
    <div className="App">
      <h1>Coordinator app</h1>
    </div>
  );
}

export default App;
