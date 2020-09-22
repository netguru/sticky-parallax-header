import React from 'react';
import { bool, node } from 'prop-types';

class StaticContainer extends React.Component {
  shouldComponentUpdate = (nextProps) => !!nextProps.shouldUpdate;

  render() {
    const { children } = this.props;
    const child = children;
    if (child === null || child === false) {
      return null;
    }

    return React.Children.only(child);
  }
}

StaticContainer.propTypes = {
  children: node,
  shouldUpdate: bool,
};

export default StaticContainer;
