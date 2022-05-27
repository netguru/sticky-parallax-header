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
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../../constants';

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
      style={[commonStyles.headerWrapper, logoContainerStyle, { backgroundColor }]}>
      <Image resizeMode={logoResizeMode} source={logo} style={[commonStyles.logo, logoStyle]} />
    </SafeAreaView>
  );
};
