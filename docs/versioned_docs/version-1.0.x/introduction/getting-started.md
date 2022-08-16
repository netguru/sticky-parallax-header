---
sidebar_position: 1
---

# Getting Started

`react-native-sticky-parallax-header` is a simple React Native library, enabling to create a fully custom header layout for your iOS, Android and web apps.

## Features
`react-native-sticky-parallax-header` provides two different type of components

- primitive components - components with sticky header setup
- predefined components - ready sticky header layouts

### Primitive components

Library exports following components:

- `StickyHeaderScrollView`
- `StickyHeaderFlatList`
- `StickyHeaderSectionList`

There is also possibility to create its own "sticky header" component, thanks to:

- `withStickyHeader` - HOC that wraps custom scroll component and sets up header & tabs layouts
- `useStickyHeaderScrollProps` - hook that sets up scroll props passed to custom "sticky header" component including "snap effect" props

### Predefined components

Library offers following header layout types:

| Tabbed Header | Avatar Header | Details Header|
| :------: | :------: | :------: |
| ![Tabbed Header Gif](@site/static/img/assets/readme_TabbedHeader.gif) |![Avatar Header Gif](@site/static/img/assets/readme_AvatarHeader.gif)| ![Details Header Gif](@site/static/img/assets/readme_DetailsHeader.gif)|

- `AvatarHeader(ScrollView|FlatList|SectionList)`
- `DetailsHeader(ScrollView|FlatList|SectionList)`
- `TabbedHeaderPager`
- `TabbedHeaderList`

### FlashList HOCs

Library also provides higher-order-components to enhance [FlashList](https://shopify.github.io/flash-list/docs/) with sticky header layouts:

- `withAvatarHeaderFlashList` (will produce FlashList equivalent of `AvatarHeader(FlashList|SectionList)`)
- `withDetailsHeaderFlashList` (will produce FlashList equivalent of `DetailsHeader(FlashList|SectionList)`)
- `withTabbedHeaderFlashList` (will produce FlashList equivalent of `TabbedHeaderList`)

As with primitive components, FlashList can also be customized to create its own "sticky header" layout, thanks to `withStickyHeaderFlashList` & `useStickyHeaderFlashListScrollProps`

## In Use

**Check the live demo on Expo Snack [here](https://snack.expo.dev/@netguru_rnd/sticky-parallax-header-example).**

<div data-snack-id="@netguru_rnd/sticky-parallax-header-example" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" className="expo-snack"></div>
