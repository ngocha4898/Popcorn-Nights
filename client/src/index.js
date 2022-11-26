import React from 'react';
import ReactDOM from "react-dom";
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  
  <React.StrictMode>
      <Auth0Provider
          domain="dev-ou8m6tfgkoapsoel.us.auth0.com"
          clientId="so4dSZNnPQtiIkVU8zsRKVflPnsCOpph"
          redirectUri={window.location.origin}
        >
            <App />
      </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);