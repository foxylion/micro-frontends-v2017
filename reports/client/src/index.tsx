import * as React from "react";
import * as ReactDOM from "react-dom";
import ReportWebComponent from "./webcomponents/ReportWebComponent";

import App from "./components/App";
import "./index.css";

window.customElements.define("app-report", ReportWebComponent);

if (process.env.NODE_ENV === "development") {
  ReactDOM.render(
    <App backendBaseUrl="http://127.0.0.1:8081/" />,
    document.getElementById("root")
  );
}
