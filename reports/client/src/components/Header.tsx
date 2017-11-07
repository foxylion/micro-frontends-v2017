import * as React from "react";
import Logo from "./Logo";

interface Props {
  uiBaseUrl: string;
}

const Header: React.SFC<Props> = props => (
  <div className="App-header">
    <Logo uiBaseUrl={props.uiBaseUrl} />
    <h2 className="App-title">Report Data View</h2>
  </div>
);

export default Header;
