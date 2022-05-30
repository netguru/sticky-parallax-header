---
sidebar_position: 4
---

# Migration from 0.4.x to 1.x.x

## How to upgrade?

To upgrade from version <= 0.4.x to 1.x.x first follow [installation guide](installation.md)

After installing all packages replace old components with 1.x.x api

- `StickyParallaxHeader` with `AvatarHeader` type -> `AvatarHeaderScrollView`
- `StickyParallaxHeader` with `DetailsHeader` type -> `DetailsHeaderScrollView`
- `StickyParallaxHeader` with `TabbedHeader` type -> `TabbedHeaderPager`
- `StickyParallaxHeader` without specified type -> `StickyHeaderScrollView`

## Differences between old and new api

- new api exports separate components for each of header types, instead of single component with `headerType` prop
- new api supports `FlatList`, `SectionLis`t` & custom scroll components
- new api inherits all props of its scroll component (`ScrollViewProps`, `FlatListProps` or `SectionListProps`)
- `contentContainerStyles` is removed and can be replaced in `TabbedHeaderPager` by passing `contentContainerStyle` to `pagerProps`
- `horizontalScrollBounces` is removed and can be replaced in `TabbedHeaderPager` by passing `bounces` to `pagerProps`
- `header` prop in predefined components is replaced with `renderHeaderBar`
- `headerSize` is replaced with `onHeaderLayout`
- `onRef` prop is removed
- `scrollEvent` is replaced with worklet function `onScroll`
- `onMomentumScrollBegin`, `onMomentumScrollEnd`, `onScrollBeginDrag` & `onScrollEndDrag` are worklet functions
- `scrollRef` is removed, use `ref` instead
- `snapValue` prop is removed

## New apis that were not present in version <= 0.4.x

- `(Avatar|Details|Sticky)HeaderFlatList` - `FlatList` version of `(Avatar|Details|Sticky)ScrollView`
- `(Avatar|Details|Sticky)HeaderSectionList` - `SectionList` version of `(Avatar|Details|Sticky)ScrollView`
- `TabbedHeaderList` - tabbed header with `SectionList` that can be used to create "Uber Eats"-like header layout
- `useStickyHeaderScrollProps` - hook that sets up props responsible for "snap effect", can be used together with `StickyHeader(ScrollView|FlatList|SectionList)` to create custom sticky header layout
- `withStickyHeader` - HOC that creates custom sticky header component from custom scroll component
