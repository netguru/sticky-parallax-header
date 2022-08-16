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
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const StickyHeaderFlashList = withStickyHeaderFlashList(FlashList) as (
  props: StickyHeaderFlashListProps<string> & React.RefAttributes<FlashList<string>>
) => React.ReactElement;

const StickyHeaderFlashListExample: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const { onMomentumScrollEnd, onScroll, onScrollEndDrag, scrollHeight, scrollViewRef } =
    useStickyHeaderFlashListScrollProps({
      parallaxHeight: PARALLAX_HEIGHT,
      snapStartThreshold: SNAP_START_THRESHOLD,
      snapStopThreshold: SNAP_STOP_THRESHOLD,
      snapToEdge: true,
    });

  async function onRefresh() {
    setRefreshing(true);
    await new Promise((res) => setTimeout(res, 2000));
    setRefreshing(false);
  }

  return (
    <SafeAreaView style={screenStyles.screenContainer}>
      <StickyHeaderFlashList
        ref={scrollViewRef}
        containerStyle={screenStyles.stretchContainer}
        data={data}
        decelerationRate="fast"
        keyExtractor={(_, index) => `${index}`}
        /**
         * Refresh control is not implemented on web, which causes styles as margin or padding
         * to be duplicated - ignore it on web, it will be no-op anyway
         */
        {...Platform.select({ native: { onRefresh } })}
        refreshing={refreshing}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        renderHeader={() => {
          return (
            <View pointerEvents="box-none" style={[styles.center, { height: scrollHeight }]}>
              <Header />
            </View>
          );
        }}
        renderItem={({ item }) => {
          return <Paragraph text={item} />;
        }}
        renderTabs={() => <Tabs />}
        scrollEventThrottle={16}
        estimatedItemSize={400}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
    </SafeAreaView>
  );
};
```
