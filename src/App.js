import './App.css'
import React, {useEffect, useState } from 'react'
import {gapi} from 'gapi-script'
import EventItem from "./components/EventItem.js"

function App() {
  

  const calendarID= process.env.CALENDAR_ID
  const apiKey = process.env.GOOGLE_API_KEY
  const accessToken = process.env.GOOGLE_ACCESS_TOKEN


  return (
    <div className="App">
      <h1>Coordinator app</h1>
    </div>
  );
}

export default App;
