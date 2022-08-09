import * as React from 'react';
import type { ImageSourcePropType } from 'react-native';
import { ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';

interface HeaderBackgroundImageProps {
  background: React.ReactNode;
  backgroundHeight: number;
  backgroundImage: ImageSourcePropType;
}

export const HeaderBackgroundImage: React.FC<HeaderBackgroundImageProps> = ({
  background,
  backgroundHeight,
  backgroundImage,
}) => {
  const { width } = useWindowDimensions();

  return (
    <ImageBackground
      style={[styles.headerStyle, { height: backgroundHeight, width }]}
      source={backgroundImage}
      testID="HeaderBackgroundImage">
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
    zIndex: -1,
  },
});
