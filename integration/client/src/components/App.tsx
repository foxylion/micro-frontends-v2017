
import * as React from "react";

import GenericChildApp from './GenericChildApp';

enum Navigation {
  PROJECT,
  REPORT
}

interface State {
  navigation: Navigation;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      navigation: Navigation.PROJECT
    };
  }

  public render() {
    return (
      <table>
        <thead>
          <tr>
            <td>Menu</td>
            <td>Content</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul>
                <li onClick={this.onProjectListClick}>Project List</li>
                <li onClick={this.onReportClick}>Report</li>
              </ul>
            </td>
            <td>{this.getContent()}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  private onProjectListClick = () => {
    this.setState({
      navigation: Navigation.PROJECT
    })
  };

  private onReportClick = () => {
    this.setState({
      navigation: Navigation.REPORT
    })
  };

  private getContent(): JSX.Element {
    switch (this.state.navigation) {
      case Navigation.PROJECT:
        return <GenericChildApp componentName="app-projects" baseUrl="/projectlist" />;
      case Navigation.REPORT:
      return <GenericChildApp componentName="app-report" baseUrl="/reports" />;
    }
  }
}

export default App;
