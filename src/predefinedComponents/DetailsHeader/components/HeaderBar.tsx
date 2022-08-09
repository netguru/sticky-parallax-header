import * as React from 'react';
import type { ColorValue, StyleProp, TextStyle } from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, commonStyles } from '../../../constants';
import type { IconProps } from '../../common/SharedProps';
import IconRenderer from '../../common/components/IconRenderer';

interface HeaderBarProps extends IconProps {
  backgroundColor?: ColorValue;
  headerTitleContainerAnimatedStyle: { opacity: number };
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  titleTestID?: string;
}

const HIT_SLOP = {
  top: 15,
  left: 15,
  bottom: 15,
  right: 15,
};

export const HeaderBar: React.FC<HeaderBarProps> = ({
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
  titleStyle,
  titleTestID = 'DetailsHeaderBarTitleTestID',
}) => {
  return (
    <SafeAreaView
      edges={['left', 'top', 'right']}
      style={[commonStyles.headerWrapper, { backgroundColor }]}>
      <Pressable
        accessibilityLabel={leftTopIconAccessibilityLabel}
        accessibilityRole="button"
        hitSlop={HIT_SLOP}
        onPress={leftTopIconOnPress}
        style={styles.leftHeaderButton}
        testID={leftTopIconTestID}>
        <IconRenderer icon={leftTopIcon} />
      </Pressable>
      <Animated.View style={[styles.headerTitleContainer, headerTitleContainerAnimatedStyle]}>
        <Text style={[styles.headerTitle, titleStyle]} testID={titleTestID}>
          {title}
        </Text>
      </Animated.View>
      <Pressable
        accessibilityLabel={rightTopIconAccessibilityLabel}
        accessibilityRole="button"
        hitSlop={HIT_SLOP}
        onPress={rightTopIconOnPress}
        style={styles.rightHeaderButton}
        testID={rightTopIconTestID}>
        <IconRenderer icon={rightTopIcon} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    textAlign: 'left',
  },
  headerTitleContainer: {
    alignItems: 'flex-start',
    flex: 8,
  },
  leftHeaderButton: {
    alignItems: 'flex-start',
    flex: 1,
  },
  rightHeaderButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
