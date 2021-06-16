import React from "react";
import ReactDOM from "react-dom";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";

import { config } from "./overmind";
import App from "./App";

const overmind = createOvermind(config);

ReactDOM.render(
  <React.StrictMode>
    <Provider value={overmind}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
