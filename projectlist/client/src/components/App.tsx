import axios from "axios";
import * as React from "react";
import { TypeStyle } from "typestyle";

import Header from "./Header";

export interface Props {
  baseUrl: string;
  typeStyle: TypeStyle;
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

  public getChildContext() {
    return { style: this.props.typeStyle };
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
    );
  }
}

export default App;
