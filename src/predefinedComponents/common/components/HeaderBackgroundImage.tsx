import type { ReactNode, VFC } from 'react';
import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';

interface HeaderBackgroundImageProps {
  background: ReactNode;
  backgroundHeight: number;
  backgroundImage: ImageSourcePropType;
}

export const HeaderBackgroundImage: VFC<HeaderBackgroundImageProps> = ({
  background,
  backgroundHeight,
  backgroundImage,
}) => {
  const { width } = useWindowDimensions();

  return (
    <ImageBackground
      style={[styles.headerStyle, { height: backgroundHeight, width }]}
      source={backgroundImage}>
      {background}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
});
