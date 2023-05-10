import * as React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { Edge } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, commonStyles } from '../../../constants';
import type { AnimatedColorProp, IconProps } from '../../common/SharedProps';
import IconRenderer from '../../common/components/IconRenderer';
import { parseAnimatedColorProp } from '../../common/utils/parseAnimatedColorProp';

interface HeaderBarProps extends IconProps {
  backgroundColor?: AnimatedColorProp;
  enableSafeAreaTopInset?: boolean;
  headerTitleContainerAnimatedStyle: { opacity: number };
  title?: string;
  titleStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
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
  enableSafeAreaTopInset,
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
  const wrapperAnimatedStyle = useAnimatedStyle(() => {
    return {
      // TypeScript complains about AnimatedNode<StyleProp<ViewStyle>> from reanimated v1
      backgroundColor: parseAnimatedColorProp(backgroundColor) as string,
    };
  }, [backgroundColor]);
  const safeAreaEdges: Edge[] = ['left', 'right'];

  if (enableSafeAreaTopInset) {
    safeAreaEdges.push('top');
  }

  return (
    <SafeAreaView edges={safeAreaEdges} style={commonStyles.container}>
      <Animated.View style={[commonStyles.headerWrapper, wrapperAnimatedStyle]}>
        {leftTopIcon ? (
          <Pressable
            accessibilityLabel={leftTopIconAccessibilityLabel}
            accessibilityRole="button"
            hitSlop={HIT_SLOP}
            onPress={leftTopIconOnPress}
            style={styles.leftHeaderButton}
            testID={leftTopIconTestID}>
            <IconRenderer icon={leftTopIcon} />
          </Pressable>
        ) : null}
        <Animated.View style={[styles.headerTitleContainer, headerTitleContainerAnimatedStyle]}>
          <Animated.Text style={[styles.headerTitle, titleStyle]} testID={titleTestID}>
            {title}
          </Animated.Text>
        </Animated.View>
        {rightTopIcon ? (
          <Pressable
            accessibilityLabel={rightTopIconAccessibilityLabel}
            accessibilityRole="button"
            hitSlop={HIT_SLOP}
            onPress={rightTopIconOnPress}
            style={styles.rightHeaderButton}
            testID={rightTopIconTestID}>
            <IconRenderer icon={rightTopIcon} />
          </Pressable>
        ) : null}
      </Animated.View>
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
