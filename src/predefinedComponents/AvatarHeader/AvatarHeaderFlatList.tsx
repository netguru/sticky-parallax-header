import type { ForwardedRef, ReactElement, RefAttributes } from 'react';
import * as React from 'react';
import type { FlatList } from 'react-native';
import { View } from 'react-native';

import { commonStyles } from '../../constants';
import { StickyHeaderFlatList } from '../../primitiveComponents/StickyHeaderFlatList';

import type { AvatarHeaderFlatListProps } from './AvatarHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useAvatarHeader } from './hooks/useAvatarHeader';

function AvatarHeaderFlatListInner<ItemT>(
  props: AvatarHeaderFlatListProps<ItemT>,
  ref: ForwardedRef<FlatList<ItemT>>
) {
  const {
    backgroundColor,
    contentContainerStyle,
    data,
    decelerationRate = 'fast',
    keyExtractor,
    leftTopIcon,
    leftTopIconAccessibilityLabel,
    leftTopIconOnPress,
    leftTopIconTestID,
    nestedScrollEnabled = true,
    overScrollMode = 'never',
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
    renderHeader,
    scrollValue,
    scrollViewRef,
  } = useAvatarHeader<FlatList<ItemT>>(props);

  React.useImperativeHandle(ref, () => scrollViewRef.current as FlatList<ItemT>);

  return (
    <View style={[commonStyles.wrapper, { backgroundColor }]}>
      {renderHeaderBar ? (
        renderHeaderBar()
      ) : (
        <HeaderBar
          backgroundColor={backgroundColor}
          height={parallaxHeight}
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
          renderHeader={renderHeader}
          renderItem={renderItem}
          scrollEventThrottle={scrollEventThrottle}
        />
      </View>
    </View>
  );
}

type AvatarHeaderFlatListType = <ItemT>(
  props: AvatarHeaderFlatListProps<ItemT> & RefAttributes<FlatList<ItemT>>
) => ReactElement;

export const AvatarHeaderFlatList = React.forwardRef(
  AvatarHeaderFlatListInner
) as AvatarHeaderFlatListType;
