import * as React from "react";
import * as ReactDOM from "react-dom";
import retargetEvents from "react-shadow-dom-retarget-events";

import App from "../components/App";

class ReportWebComponent extends HTMLElement {
  private mountPoint: HTMLElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    this.mountPoint = document.createElement("div");
    this.mountPoint.className = "body";
    shadow.appendChild(this.mountPoint);
    retargetEvents(this.mountPoint);
  }

  public connectedCallback() {
    const stylePath = this.getBaseUrl() + "/static/css/main.css";
    ReactDOM.render(
      <div>
        <style type="text/css">@import "{stylePath}";</style>
        <App backendBaseUrl={this.getBaseUrl()} uiBaseUrl={this.getBaseUrl()} />
      </div>,
      this.mountPoint
    );
  }

  private getBaseUrl(): string {
    const baseUrl = this.getAttribute("baseUrl");
    if (baseUrl === undefined) {
      throw new Error(
        "Can't instantiate ReportsApp without baseUrl parameter."
      );
    } else {
      return baseUrl!;
    }
  }
}

export default ReportWebComponent;
