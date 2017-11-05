import axios from "axios";
import * as React from "react";
import { injectGlobal } from "styled-components";
import Header from "./Header";

import StylesWrapper from "./StylesWrapper";

export interface Props {
  baseUrl: string;
}

interface State {
  projects?: string;
}

class App extends React.Component<Props, State> {

  private globalStyles: any;

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

  public componentWillMount() {
    this.globalStyles = injectGlobal`
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
    }
    `;
  }

  public render() {
    return (
      <StylesWrapper>
        <div style={{ textAlign: "center" }}>
          <Header />
          <button onClick={this.loadData}>Load Data</button>
          <p style={{ fontSize: "large" }}>Hello World!</p>
          {this.state.projects !== undefined ? (
            <p>Data Loaded: {this.state.projects}</p>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </StylesWrapper>
    );
  }
}

export default App;
