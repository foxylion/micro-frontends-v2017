import * as React from "react";

import { mountStyle } from "../helpers/mountStyles";
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

const styles = {
  backgroundColor: "#222",
  color: "white",
  height: "150px",
  padding: "20px"
};

export default mountStyle(styles, Header);
