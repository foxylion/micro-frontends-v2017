import ProjectsWebComponent from "./webcomponents/ProjectsWebComponent";

window.customElements.define("app-report", ProjectsWebComponent);

if (process.env.NODE_ENV === "development") {
  const app = document.createElement("app-report");
  app.setAttribute("baseUrl", "http://127.0.0.1:8082");
  document.getElementById("root")!.appendChild(app);
}
