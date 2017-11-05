import * as React from "react";
import {StyleSheetManager} from "styled-components";

interface State {
  styles: string;
}

class WebComponentScopedStyles extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      styles: StyleSheet.instance.toHTML()
    };
  }

  public componentDidMount() {
    const stylesheet = new StyleSheet();
    const updatedStyles = stylesheet.toHTML();

    if (this.state.styles !== updatedStyles) {
      this.setState({ styles: updatedStyles });
    }
  }

  public componentDidUpdate() {
    const updatedStyles = StyleSheet.instance.toHTML();

    if (this.state.styles !== updatedStyles) {
      this.setState({ styles: updatedStyles });
    }
  }

  public render() {
    return (
      <div>
        <StyleSheetManager sheet={}>
        {this.props.children}
        </StyleSheetManager>
        <div dangerouslySetInnerHTML={{ __html: this.state.styles }} />
      </div>
    );
  }
}

export default WebComponentScopedStyles;
