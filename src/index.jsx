import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import WithLogin from "./components/WithLogin";
import WithService from "./components/WithService";

ReactDOM.render(
  <React.StrictMode>
    <WithService>
      <WithLogin>
        <App />
      </WithLogin>
    </WithService>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
