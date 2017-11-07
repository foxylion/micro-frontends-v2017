import axios from "axios";
import * as React from "react";

import "./App.css";
import Header from "./Header";

export interface Props {
  backendBaseUrl?: string;
  uiBaseUrl?: string;
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
      .get(this.getBackendBaseUrl() + "/api/v1/report")
      .then(response => {
        this.setState({
          report: JSON.stringify(response.data)
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
        <div className="App">
          <Header uiBaseUrl={this.getUiBaseUrl()} />
          <button onClick={this.loadData}>Load Data</button>
          <p className="App-intro">Hello World!</p>
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
