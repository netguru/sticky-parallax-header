import * as React from 'react';
import type { FlatList } from 'react-native';
import { View } from 'react-native';

import { commonStyles } from '../../constants';
import { StickyHeaderFlatList } from '../../primitiveComponents/StickyHeaderFlatList';

import type { DetailsHeaderFlatListProps } from './DetailsHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useDetailsHeader } from './hooks/useDetailsHeader';

function DetailsHeaderFlatListInner<ItemT>(
  props: DetailsHeaderFlatListProps<ItemT>,
  ref: React.ForwardedRef<FlatList<ItemT>>
) {
  const {
    backgroundColor,
    contentContainerStyle,
    data,
    decelerationRate = 'fast',
    enableSafeAreaTopInset = true,
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
    headerTitleContainerAnimatedStyle,
    renderHeader,
    scrollViewRef,
    onScroll,
    onScrollEndDrag,
    onMomentumScrollEnd,
  } = useDetailsHeader<FlatList<ItemT>>(props);

  React.useImperativeHandle(ref, () => scrollViewRef.current as FlatList<ItemT>);

  return (
    <View style={[commonStyles.container, { backgroundColor }]}>
      {renderHeaderBar ? (
        renderHeaderBar()
      ) : (
        <HeaderBar
          backgroundColor={backgroundColor}
          enableSafeAreaTopInset={enableSafeAreaTopInset}
          headerTitleContainerAnimatedStyle={headerTitleContainerAnimatedStyle}
          leftTopIcon={leftTopIcon}
          leftTopIconAccessibilityLabel={leftTopIconAccessibilityLabel}
          leftTopIconOnPress={leftTopIconOnPress}
          leftTopIconTestID={leftTopIconTestID}
          rightTopIcon={rightTopIcon}
          rightTopIconAccessibilityLabel={rightTopIconAccessibilityLabel}
          rightTopIconOnPress={rightTopIconOnPress}
          rightTopIconTestID={rightTopIconTestID}
          title={title}
          titleStyle={titleStyle}
        />
      )}
      <View style={commonStyles.container}>
        <StickyHeaderFlatList
          ref={scrollViewRef}
          {...rest}
          contentContainerStyle={contentContainerStyle}
          data={data}
          decelerationRate={decelerationRate}
          keyExtractor={keyExtractor}
          nestedScrollEnabled={nestedScrollEnabled}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          overScrollMode={overScrollMode}
          renderHeader={renderHeader}
          renderItem={renderItem}
          scrollEventThrottle={scrollEventThrottle}
        />
      </View>
    </View>
  );
}

type DetailsHeaderFlatListType = <ItemT>(
  props: DetailsHeaderFlatListProps<ItemT> & React.RefAttributes<FlatList<ItemT>>
) => React.ReactElement;

export const DetailsHeaderFlatList = React.forwardRef(
  DetailsHeaderFlatListInner
) as DetailsHeaderFlatListType;
