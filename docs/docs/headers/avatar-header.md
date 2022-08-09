---
sidebar_position: 4
---

# Avatar Header

![Avatar Header Gif](@site/static/img/assets/readme_Avatar.gif)

## Example usage

```tsx
import * as React from 'react'
import {
  AvatarHeaderScrollView,
  AvatarHeaderFlatList,
  AvatarHeaderSectionList,
} from 'react-native-sticky-parallax-header'

export const TestScrollViewScreen = () => (
  <>
    <AvatarHeaderScrollView
      leftTopIcon={require('<path-to-details-left-icon>')}
      image={{ uri: '<path-to-details-image>' }}
      backgroundColor="green"
      subtitle="Details subtitle"
      title="Details title"
    >
      {/** scroll view content */}
    </AvatarHeaderScrollView>
  </>
)

export const TestFlatListScreen = () => (
  <>
    <AvatarHeaderFlatList
      {...flatListProps}
      leftTopIcon={require('<path-to-details-left-icon>')}
      image={{ uri: '<path-to-details-image>' }}
      backgroundColor="green"
      subtitle="Details subtitle"
      title="Details title"
    />
  </>
)

export const TestSectionListScreen = () => (
  <>
    <AvatarHeaderSectionList
      {...sectionListProps}
      leftTopIcon={require('<path-to-details-left-icon>')}
      image={{ uri: '<path-to-details-image>' }}
      backgroundColor="green"
      subtitle="Details subtitle"
      title="Details title"
    />
  </>
)
```

## Props

### AvatarHeaderScrollView props

Inherits [ScrollViewProps](https://reactnative.dev/docs/next/scrollview#props) and [Shared AvatarHeader props](#shared-avatarheader-props)

### AvatarHeaderFlatList props

Inherits [FlatListProps](https://reactnative.dev/docs/next/flatlist#props) and [Shared AvatarHeader props](#shared-avatarheader-props)

### AvatarHeaderFlatList props

Inherits [SectionListProps](https://reactnative.dev/docs/next/sectionlist#props) and [Shared AvatarHeader props](#shared-avatarheader-props)

### Shared AvatarHeader props
| Prop | Type | Default value |
| - | - | - |
| backgroundColor | color - `ColorValue` | - |
| backgroundImage | image source - `ImageSourcePropType` | - |
| containerStyle | style - `StyleProp<ViewStyle>` | - |
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
| stickyTabs | boolean | true |
| subtitle | string | - |
| subtitleStyle | style - `StyleProp<TextStyle>` | - |
| subtitleTestID | string | - |
| tabsContainerBackgroundColor | color - `ColorValue` | - |
| title | string | - |
| titleStyle | style - `StyleProp<TextStyle>` | - |
| titleTestID | string | - |
