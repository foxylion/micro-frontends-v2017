import axios from "axios";
import * as React from "react";

import WebComponentScopedStyles from "../helpers/WebComponentScopedStyles";
import Header from "./Header";

export interface Props {
  baseUrl: string;
}

interface State {
  report?: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      report: undefined
    };
  }

  private loadData = () => {
    axios
      .get(this.props.baseUrl + "/api/v1/report")
      .then(response => {
        this.setState({
          report: JSON.stringify(response.data)
        });
      })
      .catch(error => {
        window.alert("Error fetching and parsing data" + error);
      });
  };

  public render() {
    return (
      <div>
        <WebComponentScopedStyles />
        <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
          <Header baseUrl={this.props.baseUrl} />
          <button onClick={this.loadData}>Load Data</button>
          <p style={{ fontSize: "large" }}>Hello World!</p>
          {this.state.report !== undefined ? (
            <p>Data Loaded: {this.state.report}</p>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
