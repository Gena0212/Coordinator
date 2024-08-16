import './App.css'

function App() {
  const {google} = require('googleapis');
  const crypto = require('crypto');
  const express = require('express');
  const session = require('express-session');

  /**
   * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
   * from the client_secret.json file. To get these credentials for your application, visit
   * https://console.cloud.google.com/apis/credentials.
   */
  
  const oauth2Client = new google.auth.OAuth2(
    '475553630933-f5mu6cflagmam5s3isbho3n3apii9ka3.apps.googleusercontent.com',
    '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',
    'http://localhost:8080'
  );

  // Access scopes for read-only Drive activity.
  const scopes = [
    'https://www.googleapis.com/auth/drive.metadata.readonly'
  ];

  // Generate a secure random state value.
  const state = crypto.randomBytes(32).toString('hex');

  // Store state in the session
  req.session.state = state;

  // Generate a url that asks permissions for the Drive activity scope
  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
      * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
    // Include the state parameter to reduce the risk of CSRF attacks.
    state: state
  });

}

export default App;
