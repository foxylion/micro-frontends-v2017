import ProjectsWebComponent from "./webcomponents/ProjectsWebComponent";

window.customElements.define("app-projects", ProjectsWebComponent);

if (process.env.NODE_ENV === "development") {
  const app = document.createElement("app-projects");
  app.setAttribute("baseUrl", "./");
  document.getElementById("root")!.appendChild(app);
}
