import * as React from "react";
import * as ReactDOM from "react-dom";
import retargetEvents from "react-shadow-dom-retarget-events";
import { createTypeStyle, TypeStyle } from "typestyle";

import App from "../components/App";

class ProjectsWebComponent extends HTMLElement {
  private mountPoint: HTMLElement;
  private typeStyle: TypeStyle;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    this.mountPoint = document.createElement("div");
    shadow.appendChild(this.mountPoint);
    this.typeStyle = createTypeStyle(this.mountPoint);

    retargetEvents(this.mountPoint);
  }

  public connectedCallback() {
    ReactDOM.render(
      <App baseUrl={this.getBaseUrl()} typeStyle={this.typeStyle} />,
      this.mountPoint
    );
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

export default ProjectsWebComponent;
