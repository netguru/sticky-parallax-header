---
sidebar_position: 2
---

# Custom Header

To create custom header layout, you'll have to use `StickyHeader(ScrollView|FlatList|SectionList)` & `useStickyHeaderScrollProps`. If you want to use custom scroll component, instead of `StickyHeader(ScrollView|FlatList|SectionList)`, you can wrap your custom scroll component in `withStickyHeader` HOC.

## Scroll props

`useStickyHeaderScrollProps` is a hook responsible for creating "snap effect" behavior

```tsx
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
```

Props returned from `useStickyHeaderScrollProps` should be passed to sticky header component (`StickyHeader(ScrollView|FlatList|SectionList)` or `withStickyHeader` decorated scroll component)

```tsx
<StickyHeaderScrollView
  ref={scrollViewRef}
  onScroll={onScroll}
  onMomentumScrollEnd={onMomentumScrollEnd}
  onScrollEndDrag={onScrollEndDrag}
  renderHeader={() => {
    /** 
     * If you need, pass `scrollHeight` & `scrollValue` from `useStickyHeaderScrollProps`
     * 
     * Remember to add pointerEvents="box-none" and pointerEvents="none" to header components, to make header part scrollable
     */
    return (
      <View pointerEvents="box-none" style={{ height: scrollHeight }}>
        <Foreground scrollValue={scrollValue} />
      </View>
    );
  }}
  // ...
  >
  {/** content */}
</StickyHeaderScrollView>
```

## Display custom header/tabs layout

To display custom header or tabs layout, use `renderHeader` & `renderTabs` props

```tsx
<StickyHeaderScrollView
  // ...
  renderHeader={() => {
    /** 
     * If you need, pass `scrollHeight` & `scrollValue` from `useStickyHeaderScrollProps`
     * 
     * Remember to add pointerEvents="box-none" and pointerEvents="none" to header components, to make header part scrollable
     */
    return (
      <View pointerEvents="box-none" style={{ height: scrollHeight }}>
        <Foreground scrollValue={scrollValue} />
      </View>
    );
  }}
  // ...
  >
  {/** content */}
</StickyHeaderScrollView>
```

## Summary - Full source code

Full source code can be found in [example repo](https://github.com/netguru/sticky-parallax-header/blob/master/example/src/screens/SimsScreen/index.tsx)
