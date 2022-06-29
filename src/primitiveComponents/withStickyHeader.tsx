/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentPropsWithRef, ComponentType, FC } from 'react';
import React, { forwardRef, useMemo } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import type { StickyHeaderSharedProps } from './StickyHeaderProps';
import { useStickyHeaderProps } from './useStickyHeaderProps';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

const createCellRenderer = (itemLayoutAnimation: any) => {
  const cellRenderer: React.FC<{ onLayout: (event: LayoutChangeEvent) => void }> = (props) => {
    return (
      <Animated.View layout={itemLayoutAnimation} onLayout={props.onLayout}>
        {props.children}
      </Animated.View>
    );
  };

  return cellRenderer;
};

export function withStickyHeader<T extends ComponentType<any>>(component: T) {
  const AnimatedComponent = Animated.createAnimatedComponent(component as any) as any;

  return forwardRef<
    T,
    StickyHeaderSharedProps & Animated.AnimateProps<React.ComponentPropsWithRef<T>>
  >((props, ref) => {
    const {
      containerStyle,
      contentContainerStyle,
      itemLayoutAnimation,
      overScrollMode = 'never',
      renderHeader,
      renderTabs,
      scrollEventThrottle = 16,
      style,
      ...rest
    } = props;
    const {
      contentContainerPaddingTop,
      headerAnimatedStyle,
      headerHeight,
      listMarginTop,
      onHeaderLayoutInternal,
      onTabsLayoutInternal,
      scrollHandler,
      tabsHeight,
    } = useStickyHeaderProps(props);

    const cellRenderer = useMemo(
      () => createCellRenderer(itemLayoutAnimation),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

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
        <AnimatedComponent
          ref={ref}
          {...rest}
          CellRendererComponent={cellRenderer}
          contentContainerStyle={[
            contentContainerStyle,
            { paddingTop: headerHeight + contentContainerPaddingTop },
          ]}
          onScroll={scrollHandler}
          /**
           * Workaround for reanimated v2.3+ bug
           *
           * https://github.com/software-mansion/react-native-reanimated/issues/2735#issuecomment-1001714779
           */
          onScrollBeginDrag={NOOP}
          onScrollEndDrag={NOOP}
          onMomentumScrollBegin={NOOP}
          onMomentumScrollEnd={NOOP}
          overScrollMode={overScrollMode}
          progressViewOffset={headerHeight}
          scrollEventThrottle={scrollEventThrottle}
          style={[style, { marginTop: tabsHeight + listMarginTop }]}
        />
      </View>
    );
  }) as unknown as FC<StickyHeaderSharedProps & Animated.AnimateProps<ComponentPropsWithRef<T>>>;
}

export const styles = StyleSheet.create({
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
