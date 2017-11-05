import ProjectsWebComponent from "./webcomponents/ProjectsWebComponent";

window.customElements.define("app-projects", ProjectsWebComponent);

if (process.env.NODE_ENV === "development") {
  const app = document.createElement("app-projects");
  app.setAttribute("baseUrl", "http://127.0.0.1:8081");
  document.getElementById("root")!.appendChild(app);
}
