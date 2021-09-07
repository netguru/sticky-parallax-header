import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import StaticContainer from './StaticContainer';

type Props = { shouldUpdated: boolean } & ViewProps;

const SceneComponent: FC<Props> = (props) => {
  const { shouldUpdated } = props;
  const { children } = props;

  return (
    <View {...props}>
      <StaticContainer shouldUpdate={shouldUpdated}>{children}</StaticContainer>
    </View>
  );
};

export default SceneComponent;
