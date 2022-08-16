---
sidebar_position: 2
---

# Custom Header

To create custom header layout, you'll have to use `StickyHeader(ScrollView|FlatList|SectionList)` & `useStickyHeaderScrollProps`. If you want to use custom scroll component, instead of `StickyHeader(ScrollView|FlatList|SectionList)`, you can wrap your custom scroll component in `withStickyHeader` HOC.

For scroll props use `useStickyHeaderScrollProps` hook, which is responsible for creating "snap effect" behavior.

Props returned from `useStickyHeaderScrollProps` should be passed to sticky header component (`StickyHeader(ScrollView|FlatList|SectionList)` or `withStickyHeader` decorated scroll component).

To display custom header or tabs layout, use `renderHeader` & `renderTabs` props.

Full source code can be found in [example repo](https://github.com/netguru/sticky-parallax-header/blob/master/example/src/screens/SimsScreen/index.tsx)

```tsx
const PARALLAX_HEIGHT = 330;
const HEADER_BAR_HEIGHT = 92;
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const SimsScreen: React.FC = () => {
  const { width: windowWidth } = useWindowDimensions();
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
    // useStickyHeaderScrollProps is generic and need to know
    // which component (ScrollView, FlatList<ItemT> or SectionList<ItemT, SectionT>)
    // will be enhanced with sticky scroll props
  } = useStickyHeaderScrollProps<ScrollView>({
    parallaxHeight: PARALLAX_HEIGHT,
    snapStartThreshold: SNAP_START_THRESHOLD,
    snapStopThreshold: SNAP_STOP_THRESHOLD,
    snapToEdge: true,
  });

  return (
    <View style={screenStyles.screenContainer}>
      <View style={[styles.headerBarContainer, { width: windowWidth }]}>
        <HeaderBar scrollValue={scrollValue} />
      </View>
      <View style={screenStyles.stretchContainer}>
        <StickyHeaderScrollView
          ref={scrollViewRef}
          containerStyle={screenStyles.stretchContainer}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          renderHeader={() => {
            return (
              <View pointerEvents="box-none" style={{ height: scrollHeight }}>
                <Foreground scrollValue={scrollValue} />
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          style={screenStyles.stretch}>
          <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.content}>
            <Text style={screenStyles.text}>
              {text}
            </Text>
          </SafeAreaView>
        </StickyHeaderScrollView>
      </View>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} translucent />
    </View>
  );
};
```
