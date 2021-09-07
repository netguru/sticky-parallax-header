import React from 'react';

type Props = { shouldUpdate: boolean };

class StaticContainer extends React.Component<Props> {
  shouldComponentUpdate = (nextProps: Props) => !!nextProps.shouldUpdate;

  render() {
    const { children } = this.props;
    const child = children;
    if (child === null || child === false) {
      return null;
    }

    return React.Children.only(child);
  }
}

export default StaticContainer;
