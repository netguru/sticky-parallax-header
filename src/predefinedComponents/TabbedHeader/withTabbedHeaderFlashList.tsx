import type { FlashList, FlashListProps } from '@shopify/flash-list';
import * as React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { Edge } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonStyles } from '../../constants';
import type { StickyHeaderFlashListProps } from '../../primitiveComponents/StickyHeaderProps';
import { withStickyHeaderFlashList } from '../../primitiveComponents/withStickyHeaderFlashList';
import { parseAnimatedColorProp } from '../common/utils/parseAnimatedColorProp';

import type { TabbedHeaderFlashListProps } from './TabbedHeaderProps';
import { HeaderBar } from './components/HeaderBar';
import { useTabbedFlashListHeader } from './hooks/useTabbedFlashListHeader';

export function withTabbedHeaderFlashList<ItemT>(
  flashListComponent: React.ComponentType<FlashListProps<ItemT>>
) {
  const StickyHeaderFlashList = withStickyHeaderFlashList(
    flashListComponent as React.ComponentType<FlashListProps<ItemT>>
  ) as (
    props: StickyHeaderFlashListProps<ItemT> & React.RefAttributes<FlashList<ItemT>>
  ) => React.ReactElement;

  return React.forwardRef<FlashList<ItemT>, TabbedHeaderFlashListProps<ItemT>>((props, ref) => {
    const {
      backgroundColor,
      decelerationRate = 'fast',
      enableSafeAreaTopInset = true,
      logo,
      logoContainerStyle,
      logoResizeMode,
      logoStyle,
      nestedScrollEnabled = true,
      overScrollMode = 'never',
      renderHeader,
      renderHeaderBar,
      scrollEventThrottle = 16,
      viewabilityConfig = { itemVisiblePercentThreshold: 50 },
      ...rest
    } = props;
    const {
      onMomentumScrollEnd,
      onScroll,
      onScrollEndDrag,
      onViewableItemsChanged,
      renderHeader: defaultRenderHeader,
      renderTabs,
      scrollViewRef,
    } = useTabbedFlashListHeader<ItemT>(props);

    React.useImperativeHandle(ref, () => scrollViewRef.current as FlashList<ItemT>);

    const wrapperAnimatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: parseAnimatedColorProp(backgroundColor),
      };
    });

    return (
      <Animated.View style={[commonStyles.container, wrapperAnimatedStyle]}>
        {renderHeaderBar ? (
          renderHeaderBar()
        ) : logo ? (
          <HeaderBar
            backgroundColor={backgroundColor}
            enableSafeAreaTopInset={enableSafeAreaTopInset}
            logo={logo}
            logoContainerStyle={logoContainerStyle}
            logoResizeMode={logoResizeMode}
            logoStyle={logoStyle}
          />
        ) : (
          <SafeAreaView
            edges={['left', 'right', ...(enableSafeAreaTopInset ? ['top' as Edge] : [])]}
            style={commonStyles.stretch}
          />
        )}
        <View style={commonStyles.wrapper}>
          <StickyHeaderFlashList
            ref={scrollViewRef}
            {...rest}
            decelerationRate={decelerationRate}
            nestedScrollEnabled={nestedScrollEnabled}
            overScrollMode={overScrollMode}
            scrollEventThrottle={scrollEventThrottle}
            viewabilityConfig={viewabilityConfig}
            renderHeader={renderHeader ?? defaultRenderHeader}
            renderTabs={renderTabs}
            onScroll={onScroll}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onViewableItemsChanged={onViewableItemsChanged}
          />
        </View>
      </Animated.View>
    );
  });
}
