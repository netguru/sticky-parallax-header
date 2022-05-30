---
sidebar_position: 3
---

# Details Header

![Details Header Gif](@site/static/img/assets/readme_Details.gif)

## Example usage

```tsx
import React from 'react'
import {
  DetailsHeaderScrollView,
  DetailsHeaderFlatList,
  DetailsHeaderSectionList,
} from 'react-native-sticky-parallax-header'

export const TestScrollViewScreen = () => (
  <DetailsHeaderScrollView
    leftTopIcon={require('<path-to-details-left-icon>')}
    image={{ uri: '<path-to-details-image>' }}
    backgroundColor="green"
    tag="Details type"
    title="Details title"
  >
    {/** scroll view content */}
  </DetailsHeaderScrollView>
)

export const TestFlatListScreen = () => (
  <DetailsHeaderFlatList
    {...flatListProps}
    leftTopIcon={require('<path-to-details-left-icon>')}
    image={{ uri: '<path-to-details-image>' }}
    backgroundColor="green"
    tag="Details type"
    title="Details title"
  />
)

export const TestSectionListScreen = () => (
  <DetailsHeaderSectionList
    {...sectionListProps}
    leftTopIcon={require('<path-to-details-left-icon>')}
    image={{ uri: '<path-to-details-image>' }}
    backgroundColor="green"
    tag="Details type"
    title="Details title"
  />
)
```

## Props

### DetailsHeaderScrollView props

Inherits [ScrollViewProps](https://reactnative.dev/docs/next/scrollview#props) and [Shared DetailsHeader props](#shared-detailsheader-props)

### DetailsHeaderFlatList props

Inherits [FlatListProps](https://reactnative.dev/docs/next/flatlist#props) and [Shared DetailsHeader props](#shared-detailsheader-props)

### DetailsHeaderFlatList props

Inherits [SectionListProps](https://reactnative.dev/docs/next/sectionlist#props) and [Shared DetailsHeader props](#shared-detailsheader-props)

### Shared DetailsHeader props
| Prop | Type | Default value |
| - | - | - |
| backgroundColor | color - `ColorValue` | - |
| backgroundImage | image source - `ImageSourcePropType` | - |
| containerStyle | style - `StyleProp<ViewStyle>` | - |
| contentIcon | image source - `ImageSourcePropType` | - |
| contentIconNumber | number | - |
| contentIconNumberStyle | style - `StyleProp<TextStyle>` | - |
| leftTopIcon | render function or image source | - |
| leftTopIconAccessibilityLabel | string | - |
| leftTopIconOnPress | function - `() => void` | - |
| leftTopIconTestID | string | - |
| hasBorderRadius | boolean | - |
| headerHeight | number | 100 |
| image | image source - `ImageSourcePropType` | - |
| onHeaderLayout | function - `(e: LayoutChangeEvent) => void` | - |
| onMomentumScrollBegin | worklet function - `(e: NativeScrollEvent) => void` | - |
| onMomentumScrollEnd | worklet function - `(e: NativeScrollEvent) => void` | - |
| onScroll | worklet function - `(e: NativeScrollEvent) => void` | - |
| onScrollBeginDrag | worklet function - `(e: NativeScrollEvent) => void` | - |
| onScrollEndDrag | worklet function - `(e: NativeScrollEvent) => void` | - |
| onTabsLayout | function - `(e: LayoutChangeEvent) => void` | - |
| onTopReached | function - `() => void` | - |
| parallaxHeight | number | 53% of screen's height |
| renderHeaderBar | render function | - |
| rightTopIcon | render function or image source | - |
| rightTopIconAccessibilityLabel | string | - |
| rightTopIconOnPress | function - `() => void` | - |
| rightTopIconTestID | string | - |
| snapStartThreshold | number | - |
| snapStopThreshold | number | - |
| snapToEdge | boolean | true |
| tabsContainerBackgroundColor | color - `ColorValue` | - |
| tag | string | - |
| tagStyle | style - `StyleProp<TextStyle>` | - |
| title | string | - |
| titleStyle | style - `StyleProp<TextStyle>` | - |
