import axios from "axios";
import * as React from "react";

import WebComponentScopedStyles from "../helpers/WebComponentScopedStyles";
import Header from "./Header";

export interface Props {
  baseUrl: string;
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
      .get(this.props.baseUrl + "/api/v1/projects")
      .then(response => {
        this.setState({
          projects: JSON.stringify(response.data)
        });
      })
      .catch(error => {
        window.alert("Error fetching and parsing data" + error);
      });
  };

  public render() {
    return (
      <WebComponentScopedStyles>
        <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
          <Header baseUrl={this.props.baseUrl} />
          <button onClick={this.loadData}>Load Data</button>
          <p style={{ fontSize: "large" }}>Hello World!</p>
          {this.state.projects !== undefined ? (
            <p>Data Loaded: {this.state.projects}</p>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </WebComponentScopedStyles>
    );
  }
}

export default App;
