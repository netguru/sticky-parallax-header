import type { FC } from 'react';
import React from 'react';
import type { ColorValue } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import IconRenderer from '../../../components/IconRenderer/IconRenderer';
import colors from '../../../constants/colors';
import type { IconProps } from '../../common/SharedProps';

interface HeaderBarProps extends IconProps {
  backgroundColor?: ColorValue;
  headerTitleContainerAnimatedStyle: { opacity: number };
  title?: string;
}

const HIT_SLOP = {
  top: 15,
  left: 15,
  bottom: 15,
  right: 15,
};

export const HeaderBar: FC<HeaderBarProps> = ({
  backgroundColor,
  headerTitleContainerAnimatedStyle,
  leftTopIcon,
  leftTopIconAccessibilityLabel,
  leftTopIconOnPress,
  leftTopIconTestID,
  rightTopIcon,
  rightTopIconAccessibilityLabel,
  rightTopIconOnPress,
  rightTopIconTestID,
  title,
}) => {
  return (
    <SafeAreaView
      edges={['left', 'top', 'right']}
      style={[styles.headerWrapper, { backgroundColor }]}>
      <View style={styles.headerMenu}>
        <Pressable
          accessibilityLabel={leftTopIconAccessibilityLabel}
          accessibilityRole="button"
          hitSlop={HIT_SLOP}
          onPress={leftTopIconOnPress}
          testID={leftTopIconTestID}>
          <IconRenderer icon={leftTopIcon} />
        </Pressable>
        <Animated.View style={[styles.headerTitleContainer, headerTitleContainerAnimatedStyle]}>
          <Text style={styles.headerTitle}>{title}</Text>
        </Animated.View>
        <Pressable
          accessibilityLabel={rightTopIconAccessibilityLabel}
          accessibilityRole="button"
          hitSlop={HIT_SLOP}
          onPress={rightTopIconOnPress}
          testID={rightTopIconTestID}>
          <IconRenderer icon={rightTopIcon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerMenu: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    textAlign: 'left',
  },
  headerTitleContainer: {
    alignItems: 'flex-start',
    flex: 1,
  },
  headerWrapper: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});
