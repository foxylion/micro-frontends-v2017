import axios from "axios";
import * as React from "react";

import StyledComponentsScopedStyles from "../helpers/StyledComponentsScopedStyles";
import Header from "./Header";

export interface Props {
  uiBaseUrl?: string;
  backendBaseUrl?: string;
}

interface State {
  projects?: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      projects: undefined
    };
  }

  private loadData = () => {
    axios
      .get(this.getBackendBaseUrl() + "/api/v1/projects")
      .then(response => {
        this.setState({
          projects: JSON.stringify(response.data)
        });
      })
      .catch(error => {
        window.alert("Error fetching and parsing data" + error);
      });
  };

  private getUiBaseUrl: () => string = () => {
    if (this.props.uiBaseUrl === undefined) {
      return ".";
    } else {
      return this.props.uiBaseUrl;
    }
  };

  private getBackendBaseUrl: () => string = () => {
    if (this.props.backendBaseUrl === undefined) {
      return ".";
    } else {
      return this.props.backendBaseUrl;
    }
  };

  public render() {
    return (
      <div>
        <StyledComponentsScopedStyles />
        <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
          <Header uiBaseUrl={this.getUiBaseUrl()} />
          <button onClick={this.loadData}>Load Data</button>
          <p style={{ fontSize: "large" }}>Hello World!</p>
          {this.state.projects !== undefined ? (
            <p>Data Loaded: {this.state.projects}</p>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
