---
sidebar_position: 5
---

# Custom Sticky Header

## Example usage

```tsx
import * as React from 'react';
import { View } from 'react-native';
import {
  StickyHeaderScrollView,
  useStickyHeaderScrollProps,
} from 'react-native-sticky-parallax-header';

const PARALLAX_HEIGHT = 330;
const HEADER_BAR_HEIGHT = 92;
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const TestScreen = () => {
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderScrollProps({
    parallaxHeight: PARALLAX_HEIGHT,
    snapStartThreshold: SNAP_START_THRESHOLD,
    snapStopThreshold: SNAP_STOP_THRESHOLD,
    snapToEdge: true,
  });

  return (
    <View>
      {/** render header bar */}
      <View>
        <StickyHeaderScrollView
          ref={scrollViewRef}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          renderHeader={() => {
            return (
              <View style={{ height: scrollHeight }}>
                {/** render header foreground */}
              </View>
            );
          }}>
          {/** render scroll view content */}
        </StickyHeaderScrollView>
      </View>
    </View>
  );
}
```

## Props

### StickyHeaderScrollViewProps

Inherits [ScrollViewProps](https://reactnative.dev/docs/next/scrollview#props) and [Shared StickyHeader props](#shared-stickyheader-props)

### StickyHeaderFlatListProps

Inherits [FlatListProps](https://reactnative.dev/docs/next/flatlist#props) and [Shared StickyHeader props](#shared-stickyheader-props)

### StickyHeaderSectionListProps

Inherits [SectionListProps](https://reactnative.dev/docs/next/sectionlist#props) and [Shared StickyHeader props](#shared-stickyheader-props)

### Shared StickyHeader props
| Prop | Type | Default value |
| - | - | - |
| containerStyle | style - `StyleProp<ViewStyle>` | - |
| onHeaderLayout | function - `(e: LayoutChangeEvent) => void` | - |
| onMomentumScrollBegin | worklet function - `(e: NativeScrollEvent) => void` | - |
| onMomentumScrollEnd | worklet function - `(e: NativeScrollEvent) => void` | - |
| onScroll | worklet function - `(e: NativeScrollEvent) => void` | - |
| onScrollBeginDrag | worklet function - `(e: NativeScrollEvent) => void` | - |
| onScrollEndDrag | worklet function - `(e: NativeScrollEvent) => void` | - |
| onTabsLayout | function - `(e: LayoutChangeEvent) => void` | - |
| renderHeader | render function | - |
| renderTabs | render function | - |
| stickyTabs | boolean | true |
