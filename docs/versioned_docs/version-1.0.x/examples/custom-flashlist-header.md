---
sidebar_position: 3
---

# Custom FlashList Header

Analogically to [custom headers](./custom-header.md), react-native-sticky-parallax-header provides tools to enhance [FlashList](https://shopify.github.io/flash-list/docs/) with custom sticky header layout:

- `useStickyHeaderFlashListScrollProps` equivalent for [`useStickyHeaderScrollProps`](./custom-header.md#scroll-props)
- `withStickyHeaderFlashList` equivalent for `withStickyHeader`

Full source code can be found in [example repo](https://github.com/netguru/sticky-parallax-header/blob/master/example/src/screens/additionalExamples/StickyHeaderFlashListExample.tsx)

```tsx
const PARALLAX_HEIGHT = 330;
const HEADER_BAR_HEIGHT = 92;
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const StickyHeaderFlashList = withStickyHeaderFlashList(FlashList) as (
  props: StickyHeaderFlashListProps<string> & React.RefAttributes<FlashList<string>>
) => React.ReactElement;

const StickyHeaderFlashListExample: React.FC = () => {
  const { width: windowWidth } = useWindowDimensions();
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderFlashListScrollProps({
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
        <StickyHeaderFlashList
          ref={scrollViewRef}
          containerStyle={screenStyles.stretchContainer}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          estimatedItemSize={400}
          renderItem={({ item }) => {
            return <Paragraph text={item} />;
          }}
          renderTabs={() => <Tabs />}
          renderHeader={() => {
            return (
              <View pointerEvents="box-none" style={{ height: scrollHeight }}>
                <Foreground scrollValue={scrollValue} />
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          style={screenStyles.stretch}
        />
      </View>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} translucent />
    </View>
  );
};
```
