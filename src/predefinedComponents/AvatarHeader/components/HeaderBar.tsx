import * as React from 'react';
import type { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import type { Edge } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, commonStyles } from '../../../constants';
import type { AnimatedColorProp, IconProps } from '../../common/SharedProps';
import IconRenderer from '../../common/components/IconRenderer';
import { useRTLStyles } from '../../common/hooks/useRTLStyles';
import { parseAnimatedColorProp } from '../../common/utils/parseAnimatedColorProp';
import { scrollPosition } from '../../common/utils/scrollPosition';

const HIT_SLOP = {
  top: 15,
  left: 15,
  bottom: 15,
  right: 15,
};

interface HeaderProps extends IconProps {
  backgroundColor?: AnimatedColorProp;
  enableSafeAreaTopInset?: boolean;
  height: number;
  image?: ImageSourcePropType;
  scrollValue: Animated.SharedValue<number>;
  title?: string;
  titleStyle?: StyleProp<Animated.AnimateStyle<TextStyle>>;
  titleTestID?: string;
}

export const HeaderBar: React.FC<HeaderProps> = ({
  backgroundColor,
  enableSafeAreaTopInset,
  height,
  image,
  leftTopIcon,
  leftTopIconAccessibilityLabel,
  leftTopIconOnPress,
  leftTopIconTestID,
  rightTopIcon,
  rightTopIconAccessibilityLabel,
  rightTopIconOnPress,
  rightTopIconTestID,
  scrollValue,
  title,
  titleStyle,
  titleTestID = 'AvatarHeaderBarTestID',
}) => {
  const [beforeFadeImg, startFadeImg, finishFadeImg] = [
    scrollPosition(height, 30),
    scrollPosition(height, 40),
    scrollPosition(height, 70),
  ];
  const [beforeFadeName, startFadeName, finishFadeName] = [
    scrollPosition(height, 50),
    scrollPosition(height, 60),
    scrollPosition(height, 75),
  ];

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, beforeFadeImg, startFadeImg, finishFadeImg],
        [0, 0, 0.5, 1],
        Extrapolate.CLAMP
      ),
    };
  }, [scrollValue, beforeFadeImg, startFadeImg, finishFadeImg]);
  const nameAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, beforeFadeName, startFadeName, finishFadeName],
        [0, 0, 0.5, 1],
        Extrapolate.CLAMP
      ),
    };
  }, [scrollValue, beforeFadeName, startFadeName, finishFadeName]);
  const headerTitleContainerRTLStyle = useRTLStyles<ViewStyle>(
    styles.headerTitleContainerMarginRight,
    styles.headerTitleContainerMarginLeft,
    styles.headerTitleContainerMarginEnd
  );
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

        <View style={[styles.headerTitleContainer, headerTitleContainerRTLStyle]}>
          <Animated.Image
            source={image as ImageSourcePropType}
            style={[styles.headerPic, imageAnimatedStyle]}
          />
          <Animated.Text
            numberOfLines={1}
            style={[styles.headerTitle, nameAnimatedStyle, titleStyle]}
            testID={titleTestID}>
            {title}
          </Animated.Text>
        </View>
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
  headerPic: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.white,
    marginHorizontal: 12,
    textAlign: 'left',
  },
  headerTitleContainer: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleContainerMarginEnd: {
    marginEnd: 24,
  },
  headerTitleContainerMarginLeft: {
    marginLeft: 24,
  },
  headerTitleContainerMarginRight: {
    marginRight: 24,
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
