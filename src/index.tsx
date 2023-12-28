import React from "react";
import ReactDOM from "react-dom/client";
import styled, { createGlobalStyle } from "styled-components";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100vh;
    min-height: fill-available;
    min-height: -webkit-fill-available; 
  }

  html {
    height: -webkit-fill-available;
    height: fill-available;
  }

  #root {
    height: 100vh;
    min-height: 100% !important;
  }
  
  h1,
  h2,
  h3,
  p {
    font-family: Roboto;
    margin: 0px;
    font-weight: 400;
  }
`;

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
