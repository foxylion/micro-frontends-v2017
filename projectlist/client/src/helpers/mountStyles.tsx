import * as React from "react";
import { TypeStyle } from "typestyle/lib";

export function mountKeyframes<P>(
  keyframes: any,
  Comp: React.ComponentClass<P> | React.StatelessComponent<P>
): React.ComponentClass<P> {
  return class WrappedComponent extends React.Component<P, {}> {
    public context: { typeStyle: TypeStyle };

    public componentWillMount() {
      this.context.typeStyle.keyframes(keyframes);
    }

    public render() {
      return <Comp {...this.props} />;
    }
  };
}

export function mountStyle<P>(
  styleSheet: any,
  Comp: React.ComponentClass<P> | React.StatelessComponent<P>
): React.ComponentClass<P> {
  // tslint:disable-next-line:max-classes-per-file
  return class WrappedComponent extends React.Component<P, {}> {
    public context: { typeStyle: TypeStyle };

    public componentWillMount() {
      this.context.typeStyle.style(styleSheet);
    }

    public render() {
      return <Comp {...this.props} />;
    }
  };
}
