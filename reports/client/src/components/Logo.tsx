import * as React from "react";

// tslint:disable-next-line:no-var-requires
const logo = require("./logo.svg");

interface Props {
  uiBaseUrl: string;
}

const Logo: React.SFC<Props> = props => {
  const logoRelativePath = logo as string;
  const logoUrl = props.uiBaseUrl + logoRelativePath.substr(1);
  return <img src={logoUrl} className="App-logo" alt="logo" />;
};

export default Logo;
