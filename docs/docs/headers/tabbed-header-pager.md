---
sidebar_position: 1
---

# Tabbed Header Pager

![Tabbed Header Gif](@site/static/img/assets/readme_Tabbed.gif)

## Example usage

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { TabbedHeaderPager } from 'react-native-sticky-parallax-header';

const TestScreen = () => (
  <>
    <TabbedHeaderPager
      tabs={TABS.map((tab) => ({ title: tab.title }))}
    >
      {TABS.map((tab) => (
        <View key={tab.title}>
          <Text>{tab.description}</Text>
        </View>
      ))}
    </TabbedHeaderPager>
  </>
)

export default TestScreen
```

## Props

Inherits [ScrollViewProps](https://reactnative.dev/docs/next/scrollview#props)

| Prop | Type | Default value |
| - | - | - |
| backgroundColor | color - `ColorValue` | - |
| backgroundImage | image source - `ImageSourcePropType` | - |
| containerStyle | style - `StyleProp<ViewStyle>` | - |
| foregroundImage | image source - `ImageSourcePropType` | - |
| hasBorderRadius | boolean | - |
| headerHeight | number | 100 |
| initialPage | number | 0 |
| logo | image source - `ImageSourcePropType` | - |
| logoContainerStyle | style - `StyleProp<ViewStyle>` | - |
| logoResizeMode | image resize mode - `ImageResizeMode` | - |
| logoStyle | style - `StyleProp<ImageStyle>` | - |
| onChangeTab | function - `(prevPage: number, newPage: number) => void` | - |
| onHeaderLayout | function - `(e: LayoutChangeEvent) => void` | - |
| onMomentumScrollBegin | worklet function - `(e: NativeScrollEvent) => void` | - |
| onMomentumScrollEnd | worklet function - `(e: NativeScrollEvent) => void` | - |
| onScroll | worklet function - `(e: NativeScrollEvent) => void` | - |
| onScrollBeginDrag | worklet function - `(e: NativeScrollEvent) => void` | - |
| onScrollEndDrag | worklet function - `(e: NativeScrollEvent) => void` | - |
| onTabsLayout | function - `(e: LayoutChangeEvent) => void` | - |
| onTopReached | function - `() => void` | - |
| pageContainerStyle | style - `StyleProp<ViewStyle>` | - |
| pagerProps | [pager props](#pagerprops) - `PagerProps` | - |
| parallaxHeight | number | 53% of screen's height |
| rememberTabScrollPosition | boolean | - |
| renderHeaderBar | render function | - |
| snapStartThreshold | number | - |
| snapStopThreshold | number | - |
| snapToEdge | boolean | true |
| stickyTabs | boolean | true |
| tabTextActiveStyle | style - `StyleProp<TextStyle>` | - |
| tabTextContainerStyle | style - `StyleProp<ViewStyle>` | - |
| tabTextContainerActiveStyle | style - `StyleProp<ViewStyle>` | - |
| tabTextStyle | style - `StyleProp<TextStyle>` | - |
| tabUnderlineColor | color - `ColorValue` | - |
| tabWrapperStyle | style - `StyleProp<ViewStyle>` | - |
| tabs | [Tabs](#tab) array - `Tab[]` | - |
| tabsContainerBackgroundColor | color - `ColorValue` | - |
| tabsContainerHorizontalPadding | number | 20 |
| tabsContainerStyle | style - `StyleProp<ViewStyle>` | - |
| title | string | - |
| titleStyle | style = `StyleProp<TextStyle>` | - |
| titleTestID | string | - |

### Tab

| Prop | Type | Default value |
| - | - | - |
| title | string | - |
| icon | React Element or render function with isActive param | - |
| testID | string | - |

### PagerProps

Inherits [ScrollViewProps](https://reactnative.dev/docs/next/scrollview#props)

| Prop | Type | Default value |
| - | - | - |
| onMomentumScrollBegin | worklet function - `(e: NativeScrollEvent) => void` | - |
| onMomentumScrollEnd | worklet function - `(e: NativeScrollEvent) => void` | - |
| onScroll | worklet function - `(e: NativeScrollEvent) => void` | - |
| onScrollBeginDrag | worklet function - `(e: NativeScrollEvent) => void` | - |
| onScrollEndDrag | worklet function - `(e: NativeScrollEvent) => void` | - |

Methods:

| Function | Type |
| - | - |
| goToPage | function - `(pageNumber: number) => void` |
