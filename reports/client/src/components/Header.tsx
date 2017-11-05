import * as React from "react";
import styled from "styled-components";
import Logo from "./Logo";

interface Props {
  className?: string;
  baseUrl: string;
}

const Header: React.SFC<Props> = props => (
  <div className={props.className}>
    <Logo baseUrl={props.baseUrl} />
    <h2>Report Data View</h2>
  </div>
);

const StyledHeader = styled(Header)`
  background-color: #222;
  padding: 20px;
  color: white;
`;

export default StyledHeader;
