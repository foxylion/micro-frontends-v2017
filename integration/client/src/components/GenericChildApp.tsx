import * as React from "react";

function injectScript(url: string, callback: () => void) {
  const head = document.getElementsByTagName("head")[0];
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  script.setAttribute("loaded", "false");
  script.onload = () => {
    script.setAttribute("loaded", "true");
    callback();
  };
  head.appendChild(script);
}

function isScriptInjected(url: string) {
  const scripts = document.getElementsByTagName("script");
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts.item(i);
    if (script.src.endsWith(url)) {
      return true;
    }
  }
  return false;
}

function isScriptLoaded(url: string) {
  const scripts = document.getElementsByTagName("script");
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts.item(i);
    if (script.src.endsWith(url)) {
      // tslint:disable-next-line:triple-equals
      return script.getAttribute("loaded") == "true";
    }
  }
  return false;
}

interface Props {
  componentName: string;
  baseUrl: string;
}

class GenericChildApp extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public componentWillMount() {
    this.injectScriptIfNeeded();
  }

  public componentDidUpdate() {
    this.injectScriptIfNeeded();
  }

  public render() {
    const AppComponent = React.createElement(this.props.componentName, {
      baseurl: this.props.baseUrl
    });
    if (isScriptLoaded(this.getScriptUrl())) {
      return <div>{AppComponent}</div>;
    } else {
      return <div>Loading app...</div>;
    }
  }

  private injectScriptIfNeeded = () => {
    const scriptUrl = this.getScriptUrl();
    if (!isScriptInjected(scriptUrl)) {
      injectScript(scriptUrl, () => {
        this.forceUpdate();
      });
    }
  };

  private getScriptUrl = (): string => this.props.baseUrl + "/static/js/main.js";
}

export default GenericChildApp;
