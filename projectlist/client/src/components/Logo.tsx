import * as React from "react";
import styled, { keyframes } from "styled-components";

// tslint:disable-next-line:no-var-requires
const logo = require("./logo.svg");

const logoKeyFrames = keyframes`
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
`;

interface Props {
  className?: string;
  uiBaseUrl: string;
}

const Logo: React.SFC<Props> = props => {
  const logoRelativePath = logo as string;
  const logoUrl = props.uiBaseUrl + logoRelativePath.substr(1);
  return <img src={logoUrl} className={props.className} alt="logo" />;
};

const StyledLogo = styled(Logo)`
  animation: ${logoKeyFrames} infinite 20s linear;
  height: 80px;
`;

export default StyledLogo;
