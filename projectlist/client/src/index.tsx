import * as React from "react";
import * as ReactDOM from "react-dom";
import retargetEvents from "react-shadow-dom-retarget-events";
import App from "./App";

class ProjectsApp extends HTMLElement {
  private mountPoint: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    this.mountPoint = document.createElement("div");
    shadow.appendChild(this.mountPoint);
    retargetEvents(this.mountPoint);
  }

  public connectedCallback() {
    ReactDOM.render(<App baseUrl={this.getBaseUrl()} />, this.mountPoint);
  }

  private getBaseUrl(): string {
    const baseUrl = this.getAttribute("baseUrl");
    if (baseUrl === undefined) {
      throw new Error(
        "Can't instantiate ProjectsApp without baseUrl parameter."
      );
    } else {
      return baseUrl!;
    }
  }
}

window.customElements.define("app-projects", ProjectsApp);

if (process.env.NODE_ENV === "development") {
  const app = document.createElement("app-projects");
  app.setAttribute("baseUrl", "http://127.0.0.1:8081");
  document.getElementById("root")!.appendChild(app);
}
