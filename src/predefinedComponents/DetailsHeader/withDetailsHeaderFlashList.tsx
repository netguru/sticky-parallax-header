import type { FlashList, FlashListProps } from '@shopify/flash-list';
import * as React from 'react';
import { View } from 'react-native';

import { commonStyles } from '../../constants';
import type { StickyHeaderFlashListProps } from '../../primitiveComponents/StickyHeaderProps';
import { withStickyHeaderFlashList } from '../../primitiveComponents/withStickyHeaderFlashList';

import type { DetailsHeaderFlashListProps } from './DetailsHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useDetailsFlashListHeader } from './hooks/useDetailsFlashListHeader';

export function withDetailsHeaderFlashList<ItemT>(
  flashListComponent: React.ComponentType<FlashListProps<ItemT>>
) {
  const StickyHeaderFlashList = withStickyHeaderFlashList(
    flashListComponent as React.ComponentType<FlashListProps<ItemT>>
  ) as (
    props: StickyHeaderFlashListProps<ItemT> & React.RefAttributes<FlashList<ItemT>>
  ) => React.ReactElement;

  return React.forwardRef<FlashList<ItemT>, DetailsHeaderFlashListProps<ItemT>>((props, ref) => {
    const {
      backgroundColor,
      decelerationRate = 'fast',
      enableSafeAreaTopInset = true,
      leftTopIcon,
      leftTopIconAccessibilityLabel,
      leftTopIconOnPress,
      leftTopIconTestID,
      nestedScrollEnabled = true,
      overScrollMode = 'never',
      renderHeaderBar,
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
    } = useDetailsFlashListHeader<ItemT>(props);

    React.useImperativeHandle(ref, () => scrollViewRef.current as FlashList<ItemT>);

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
          <StickyHeaderFlashList
            ref={scrollViewRef}
            {...rest}
            decelerationRate={decelerationRate}
            nestedScrollEnabled={nestedScrollEnabled}
            onScroll={onScroll}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScrollEndDrag={onScrollEndDrag}
            overScrollMode={overScrollMode}
            renderHeader={renderHeader}
            scrollEventThrottle={scrollEventThrottle}
          />
        </View>
      </View>
    );
  });
}
