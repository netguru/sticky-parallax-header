import * as React from 'react';
import type { SectionList } from 'react-native';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { commonStyles } from '../../constants';
import { StickyHeaderSectionList } from '../../primitiveComponents/StickyHeaderSectionList';
import { parseAnimatedColorProp } from '../common/utils/parseAnimatedColorProp';

import type { AvatarHeaderSectionListProps } from './AvatarHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useAvatarHeader } from './hooks/useAvatarHeader';

function AvatarHeaderSectionListInner<ItemT, SectionT>(
  props: AvatarHeaderSectionListProps<ItemT, SectionT>,
  ref: React.ForwardedRef<SectionList<ItemT, SectionT>>
) {
  const {
    backgroundColor,
    contentContainerStyle,
    decelerationRate = 'fast',
    enableSafeAreaTopInset = true,
    image,
    leftTopIcon,
    leftTopIconAccessibilityLabel,
    leftTopIconOnPress,
    leftTopIconTestID,
    nestedScrollEnabled = true,
    overScrollMode = 'never',
    renderHeader,
    renderHeaderBar,
    renderSectionFooter,
    renderSectionHeader,
    rightTopIcon,
    rightTopIconAccessibilityLabel,
    rightTopIconOnPress,
    rightTopIconTestID,
    scrollEventThrottle = 16,
    sections,
    stickySectionHeadersEnabled = true,
    title,
    titleStyle,
    ...rest
  } = props;
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    parallaxHeight,
    renderHeader: defaultRenderHeader,
    scrollValue,
    scrollViewRef,
  } = useAvatarHeader<SectionList<ItemT, SectionT>>(props);

  React.useImperativeHandle(ref, () => scrollViewRef.current as SectionList<ItemT, SectionT>);

  const wrapperAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: parseAnimatedColorProp(backgroundColor),
    };
  });

  return (
    <Animated.View style={[commonStyles.wrapper, wrapperAnimatedStyle]}>
      {renderHeaderBar ? (
        renderHeaderBar()
      ) : (
        <HeaderBar
          backgroundColor={backgroundColor}
          enableSafeAreaTopInset={enableSafeAreaTopInset}
          height={parallaxHeight}
          image={image}
          leftTopIcon={leftTopIcon}
          leftTopIconAccessibilityLabel={leftTopIconAccessibilityLabel}
          leftTopIconOnPress={leftTopIconOnPress}
          leftTopIconTestID={leftTopIconTestID}
          rightTopIcon={rightTopIcon}
          rightTopIconAccessibilityLabel={rightTopIconAccessibilityLabel}
          rightTopIconOnPress={rightTopIconOnPress}
          rightTopIconTestID={rightTopIconTestID}
          scrollValue={scrollValue}
          title={title}
          titleStyle={titleStyle}
        />
      )}
      <View style={commonStyles.wrapper}>
        <StickyHeaderSectionList
          ref={scrollViewRef}
          {...rest}
          contentContainerStyle={contentContainerStyle}
          decelerationRate={decelerationRate}
          nestedScrollEnabled={nestedScrollEnabled}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          onScroll={onScroll}
          overScrollMode={overScrollMode}
          renderHeader={renderHeader ?? defaultRenderHeader}
          renderSectionFooter={renderSectionFooter}
          renderSectionHeader={renderSectionHeader}
          scrollEventThrottle={scrollEventThrottle}
          sections={sections}
          stickySectionHeadersEnabled={stickySectionHeadersEnabled}
        />
      </View>
    </Animated.View>
  );
}

type AvatarHeaderSectionListType = <ItemT, SectionT>(
  props: AvatarHeaderSectionListProps<ItemT, SectionT> &
    React.RefAttributes<SectionList<ItemT, SectionT>>
) => React.ReactElement;

export const AvatarHeaderSectionList = React.forwardRef(
  AvatarHeaderSectionListInner
) as AvatarHeaderSectionListType;
