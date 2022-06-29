---
sidebar_position: 2
---

# Tabbed Header List

![Tabbed Header List Gif](@site/static/img/assets/readme_TabbedHeaderList.gif)

## Example usage

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { TabbedHeaderList } from 'react-native-sticky-parallax-header';

const TABBED_SECTION_ITEM_HEIGHT = 100

const TestScreen = () => (
  <>
    <TabbedHeaderList
      keyExtractor={(_, i) => `${i}`}
      renderItem={({ item }) => <View key={item.title} style={{ height: TABBED_SECTION_ITEM_HEIGHT }}>
        <Text>{item.description}</Text>
      </View>}
      renderSectionHeader={({ section }) => <View style={{ height: TABBED_SECTION_ITEM_HEIGHT }}>
        <Text>{section.title}</Text>
      </View>}
      getItemLayout={(_, index) => ({
        length: TABBED_SECTION_ITEM_HEIGHT,
        offset: TABBED_SECTION_ITEM_HEIGHT * index,
        index,
      })}
      sections={TABBED_SECTIONS}
      tabs={TABBED_SECTIONS.map((tab) => ({ title: tab.title }))}
    />
  </>
)

export default TestScreen
```

## Props

Inherits [SectionListProps](https://reactnative.dev/docs/next/sectionlist#props)

| Prop | Type | Default value |
| - | - | - |
| backgroundColor | color - `ColorValue` | - |
| backgroundImage | image source - `ImageSourcePropType` | - |
| containerStyle | style - `StyleProp<ViewStyle>` | - |
| foregroundImage | image source - `ImageSourcePropType` | - |
| hasBorderRadius | boolean | - |
| headerHeight | number | 100 |
| logo | image source - `ImageSourcePropType` | - |
| logoContainerStyle | style - `StyleProp<ViewStyle>` | - |
| logoResizeMode | image resize mode - `ImageResizeMode` | - |
| logoStyle | style - `StyleProp<ImageStyle>` | - |
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
| snapStartThreshold | number | - |
| snapStopThreshold | number | - |
| snapToEdge | boolean | true |
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

### Tab

| Prop | Type | Default value |
| - | - | - |
| title | string | - |
| icon | React Element or render function with isActive param | - |
