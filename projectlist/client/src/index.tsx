import * as React from "react";
import * as ReactDOM from "react-dom";
import ProjectsWebComponent from "./webcomponents/ProjectsWebComponent";

import App from "./components/App";
import "./index.css";

window.customElements.define("app-projects", ProjectsWebComponent);

if (process.env.NODE_ENV === "development") {
  ReactDOM.render(
    <App backendBaseUrl="http://127.0.0.1:8081/" />,
    document.getElementById("root")
  );
}
