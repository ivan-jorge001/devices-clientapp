import { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import "./assets/theme.scss";
import { enableMapSet } from "immer";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

enableMapSet();
