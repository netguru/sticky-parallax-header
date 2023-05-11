/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FlashListProps } from '@shopify/flash-list';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import type { StickyHeaderFlashListProps } from './StickyHeaderProps';
import { useStickyHeaderProps } from './useStickyHeaderProps';
// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

export function withStickyHeaderFlashList<T extends React.ComponentClass<FlashListProps<any>>>(
  flashListComponent: T
) {
  const AnimatedFlashList = Animated.createAnimatedComponent(flashListComponent) as any;

  return React.forwardRef<
    T,
    StickyHeaderFlashListProps<unknown> & Animated.AnimateProps<React.PropsWithRef<T>>
  >((props, ref) => {
    const {
      containerStyle,
      contentContainerStyle,
      overScrollMode = 'never',
      onScroll,
      onScrollEndDrag,
      onMomentumScrollEnd,
      onTabsLayout,
      renderHeader,
      renderTabs,
      scrollEventThrottle = 16,
      ...rest
    } = props;
    const {
      contentContainerPaddingTop,
      contentContainerPaddingBottom,
      headerAnimatedStyle,
      headerHeight,
      onHeaderLayoutInternal,
      onTabsLayoutInternal,
      scrollHandler,
      tabsHeight,
    } = useStickyHeaderProps({
      contentContainerStyle,
      sections: [], // is not needed with FlashList
      onMomentumScrollEnd,
      onScroll,
      onScrollEndDrag,
      onTabsLayout,
    });
    const flattenContentContainerStyle = React.useMemo(() => {
      return StyleSheet.flatten([
        contentContainerStyle,
        {
          paddingBottom: tabsHeight + contentContainerPaddingBottom,
          paddingTop: headerHeight + contentContainerPaddingTop,
        },
      ]);
    }, [
      contentContainerPaddingTop,
      contentContainerPaddingBottom,
      contentContainerStyle,
      headerHeight,
      tabsHeight,
    ]);

    return (
      <View style={[styles.container, containerStyle]}>
        <Animated.View pointerEvents="box-none" style={[styles.header, headerAnimatedStyle]}>
          {renderHeader ? (
            <View pointerEvents="box-none" onLayout={onHeaderLayoutInternal}>
              {renderHeader()}
            </View>
          ) : null}
          {renderTabs ? (
            <View pointerEvents="box-none" onLayout={onTabsLayoutInternal}>
              {renderTabs()}
            </View>
          ) : null}
        </Animated.View>
        <View style={[styles.container, { paddingTop: tabsHeight }]}>
          <AnimatedFlashList
            ref={ref}
            {...rest}
            contentContainerStyle={flattenContentContainerStyle}
            onScroll={scrollHandler}
            onScrollBeginDrag={NOOP}
            onScrollEndDrag={NOOP}
            onMomentumScrollBegin={NOOP}
            onMomentumScrollEnd={NOOP}
            overScrollMode={overScrollMode}
            progressViewOffset={headerHeight}
            scrollEventThrottle={scrollEventThrottle}
          />
        </View>
      </View>
    );
  }) as unknown as React.FC<
    StickyHeaderFlashListProps<unknown> & Animated.AnimateProps<React.ComponentPropsWithRef<T>>
  >;
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    overflow: 'hidden',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
  },
});
