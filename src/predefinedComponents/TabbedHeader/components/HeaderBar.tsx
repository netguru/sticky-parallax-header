import * as React from 'react';
import type {
  ColorValue,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Image } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../../constants';

interface HeaderBarProps {
  backgroundColor?: ColorValue;
  enableSafeAreaTopInset?: boolean;
  logo: ImageSourcePropType;
  logoContainerStyle?: StyleProp<ViewStyle>;
  logoResizeMode?: ImageResizeMode;
  logoStyle?: StyleProp<ImageStyle>;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  backgroundColor,
  enableSafeAreaTopInset,
  logo,
  logoResizeMode,
  logoStyle,
  logoContainerStyle,
}) => {
  const safeAreaEdges: Edge[] = ['left', 'right'];

  if (enableSafeAreaTopInset) {
    safeAreaEdges.push('top');
  }

  return (
    <SafeAreaView
      edges={safeAreaEdges}
      style={[commonStyles.headerWrapper, logoContainerStyle, { backgroundColor }]}>
      <Image resizeMode={logoResizeMode} source={logo} style={[commonStyles.logo, logoStyle]} />
    </SafeAreaView>
  );
};
