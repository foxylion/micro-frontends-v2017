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
    <h2>Project List</h2>
  </div>
);

const StyledHeader = styled(Header)`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

export default StyledHeader;
