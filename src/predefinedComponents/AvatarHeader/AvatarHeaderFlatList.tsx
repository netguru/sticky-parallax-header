import * as React from 'react';
import type { FlatList } from 'react-native';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { commonStyles } from '../../constants';
import { StickyHeaderFlatList } from '../../primitiveComponents/StickyHeaderFlatList';
import { parseAnimatedColorProp } from '../common/utils/parseAnimatedColorProp';

import type { AvatarHeaderFlatListProps } from './AvatarHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useAvatarHeader } from './hooks/useAvatarHeader';

function AvatarHeaderFlatListInner<ItemT>(
  props: AvatarHeaderFlatListProps<ItemT>,
  ref: React.ForwardedRef<FlatList<ItemT>>
) {
  const {
    backgroundColor,
    contentContainerStyle,
    data,
    decelerationRate = 'fast',
    enableSafeAreaTopInset = true,
    image,
    keyExtractor,
    leftTopIcon,
    leftTopIconAccessibilityLabel,
    leftTopIconOnPress,
    leftTopIconTestID,
    nestedScrollEnabled = true,
    overScrollMode = 'never',
    renderHeader,
    renderHeaderBar,
    renderItem,
    rightTopIcon,
    rightTopIconAccessibilityLabel,
    rightTopIconOnPress,
    rightTopIconTestID,
    scrollEventThrottle = 16,
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
  } = useAvatarHeader<FlatList<ItemT>>(props);

  React.useImperativeHandle(ref, () => scrollViewRef.current as FlatList<ItemT>);

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
        <StickyHeaderFlatList
          ref={scrollViewRef}
          {...rest}
          contentContainerStyle={contentContainerStyle}
          data={data}
          decelerationRate={decelerationRate}
          keyExtractor={keyExtractor}
          nestedScrollEnabled={nestedScrollEnabled}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          onScroll={onScroll}
          overScrollMode={overScrollMode}
          renderHeader={renderHeader ?? defaultRenderHeader}
          renderItem={renderItem}
          scrollEventThrottle={scrollEventThrottle}
        />
      </View>
    </Animated.View>
  );
}

type AvatarHeaderFlatListType = <ItemT>(
  props: AvatarHeaderFlatListProps<ItemT> & React.RefAttributes<FlatList<ItemT>>
) => React.ReactElement;

export const AvatarHeaderFlatList = React.forwardRef(
  AvatarHeaderFlatListInner
) as AvatarHeaderFlatListType;
