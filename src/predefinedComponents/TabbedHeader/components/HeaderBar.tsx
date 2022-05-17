import type { FC } from 'react';
import React from 'react';
import type {
  ColorValue,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderBarProps {
  backgroundColor?: ColorValue;
  logo: ImageSourcePropType;
  logoContainerStyle?: StyleProp<ViewStyle>;
  logoResizeMode?: ImageResizeMode;
  logoStyle?: StyleProp<ImageStyle>;
}

export const HeaderBar: FC<HeaderBarProps> = ({
  backgroundColor,
  logo,
  logoResizeMode,
  logoStyle,
  logoContainerStyle,
}) => {
  return (
    <SafeAreaView
      edges={['left', 'top', 'right']}
      style={[styles.headerWrapper, logoContainerStyle, { backgroundColor }]}>
      <Image resizeMode={logoResizeMode} source={logo} style={[styles.logo, logoStyle]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  logo: {
    height: 24,
    width: 142,
  },
});
