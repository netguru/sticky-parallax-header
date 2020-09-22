import React from 'react';
import { View } from 'react-native';
import { node } from 'prop-types';
import StaticContainer from './StaticContainer';

const SceneComponent = (Props) => {
  const { shouldUpdated, ...props } = Props;
  const { children } = props;

  return (
    <View {...props}>
      <StaticContainer shouldUpdate={shouldUpdated}>{children}</StaticContainer>
    </View>
  );
};

SceneComponent.propTypes = {
  children: node,
};

export default SceneComponent;
