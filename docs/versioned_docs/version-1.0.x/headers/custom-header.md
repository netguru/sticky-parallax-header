---
sidebar_position: 5
---

# Custom Sticky Header

## Example usage

Check [custom header example](../examples/custom-header.md)

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
