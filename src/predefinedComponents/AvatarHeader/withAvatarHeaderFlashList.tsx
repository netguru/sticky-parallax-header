import type { FlashList, FlashListProps } from '@shopify/flash-list';
import * as React from 'react';
import { View } from 'react-native';

import { commonStyles } from '../../constants';
import type { StickyHeaderFlashListProps } from '../../primitiveComponents/StickyHeaderProps';
import { withStickyHeaderFlashList } from '../../primitiveComponents/withStickyHeaderFlashList';

import type { AvatarHeaderFlashListProps } from './AvatarHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useAvatarFlashListHeader } from './hooks/useAvatarFlashListHeader';

export function withAvatarHeaderFlashList<ItemT>(
  flashListComponent: React.ComponentType<FlashListProps<ItemT>>
) {
  const StickyHeaderFlashList = withStickyHeaderFlashList(
    flashListComponent as React.ComponentType<FlashListProps<ItemT>>
  ) as (
    props: StickyHeaderFlashListProps<ItemT> & React.RefAttributes<FlashList<ItemT>>
  ) => React.ReactElement;

  return React.forwardRef<FlashList<ItemT>, AvatarHeaderFlashListProps<ItemT>>((props, ref) => {
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
      onMomentumScrollEnd,
      onScroll,
      onScrollEndDrag,
      parallaxHeight,
      renderHeader,
      scrollValue,
      scrollViewRef,
    } = useAvatarFlashListHeader<ItemT>(props);

    React.useImperativeHandle(ref, () => scrollViewRef.current as FlashList<ItemT>);

    return (
      <View style={[commonStyles.wrapper, { backgroundColor }]}>
        {renderHeaderBar ? (
          renderHeaderBar()
        ) : (
          <HeaderBar
            backgroundColor={backgroundColor}
            enableSafeAreaTopInset={enableSafeAreaTopInset}
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
          <StickyHeaderFlashList
            ref={scrollViewRef}
            {...rest}
            decelerationRate={decelerationRate}
            nestedScrollEnabled={nestedScrollEnabled}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScrollEndDrag={onScrollEndDrag}
            onScroll={onScroll}
            overScrollMode={overScrollMode}
            renderHeader={renderHeader}
            scrollEventThrottle={scrollEventThrottle}
          />
        </View>
      </View>
    );
  });
}
