import React from "react";
import { createGlobalStyle } from "styled-components";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import { Auth0Provider } from '@auth0/auth0-react'
import background from "../src/assets/gator.png";

const domain = require('./config').domain;
const clientId = require('./config').clientId;


const GlobalStyle = createGlobalStyle`
  html {
    // transition: all 0.5s ease-in;
    height: 100vh;
    min-height:100vh;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 65%;
    background-position: 54% 15%;
    background-blend-mode: multiply;
    background-color: rgba(196, 196, 196, 0.08);
    // overflow: auto;
  }
`;

ReactDOM.render(
  
  <Router>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <GlobalStyle />
      <App />
    </Auth0Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
