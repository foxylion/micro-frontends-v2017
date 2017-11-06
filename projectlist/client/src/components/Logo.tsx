import * as React from "react";
import { mountKeyframes, mountStyle } from "../helpers/mountStyles";

// tslint:disable-next-line:no-var-requires
const logo = require("./logo.svg");

interface Props {
  className?: string;
  baseUrl: string;
}

const Logo: React.SFC<Props> = props => {
  const logoRelativePath = logo as string;
  const logoUrl = props.baseUrl + logoRelativePath.substr(1);
  return (
    <img
      src={logoUrl}
      style={{ height: "80px" }}
      className={props.className}
      alt="logo"
    />
  );
};

const keyframes = {
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" }
};

const style = {
  animationDuration: "20s",
  animationIterationCount: "infinite",
  animationName: keyframes
};

export default mountKeyframes(keyframes, mountStyle(style, Logo));
