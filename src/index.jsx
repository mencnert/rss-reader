import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import WithLogin from "./components/WithLogin";
import WithService from "./components/WithService";

ReactDOM.render(
  <React.StrictMode>
    <WithService>
      <WithLogin>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WithLogin>
    </WithService>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
