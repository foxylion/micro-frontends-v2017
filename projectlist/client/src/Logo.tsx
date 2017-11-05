import * as React from "react";
import styled, { keyframes } from "styled-components";

const logo = require("./logo.svg");

const logoKeyFrames = keyframes`
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
`;

interface Props {
    className?: string
}

const Logo: React.SFC<Props> = (props) => (
  <img src={logo} className={props.className} alt="logo" />
);

const StyledLogo = styled(Logo)`
animation: ${logoKeyFrames} infinite 20s linear;
height: 80px;
`;

export default StyledLogo;
