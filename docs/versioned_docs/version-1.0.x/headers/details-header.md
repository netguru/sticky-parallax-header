---
sidebar_position: 3
---

# Details Header

![Details Header Gif](@site/static/img/assets/readme_Details.gif)

## Example usage

Check out DetailsHeader examples for [ScrollView](https://github.com/netguru/sticky-parallax-header/blob/master/example/src/screens/additionalExamples/DetailsHeaderScrollViewExample.tsx), [FlatList](https://github.com/netguru/sticky-parallax-header/blob/master/example/src/screens/additionalExamples/DetailsHeaderFlatListExample.tsx), [SectionList](https://github.com/netguru/sticky-parallax-header/blob/master/example/src/screens/additionalExamples/DetailsHeaderSectionListExample.tsx) & [FlashList](https://github.com/netguru/sticky-parallax-header/blob/master/example/src/screens/additionalExamples/DetailsHeaderFlashListExample.tsx)

```tsx
const DetailsHeaderScrollViewExample: React.FC = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <>
      <DetailsHeaderScrollView
        leftTopIcon={iconCloseWhite}
        leftTopIconOnPress={goBack}
        rightTopIcon={IconMenu}
        contentContainerStyle={[
          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground,
        ]}
        containerStyle={screenStyles.stretchContainer}
        contentIcon={CardsBlack}
        contentIconNumber={10}
        backgroundColor={Brandon.color}
        hasBorderRadius
        image={Brandon.image}
        tag={Brandon.type}
        title={Brandon.author}
        titleStyle={screenStyles.text}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {Brandon.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
      </DetailsHeaderScrollView>
      <StatusBar barStyle="light-content" backgroundColor={Brandon.color} translucent />
    </>
  );
};
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
| contentIconNumberTestID | string | - |
| enableSafeAreaTopInset | boolean | true |
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
| tag | string | - |
| tagStyle | style - `StyleProp<TextStyle>` | - |
| tagTestID | string | - |
| title | string | - |
| titleStyle | style - `StyleProp<TextStyle>` | - |
| titleTestID | string | - |
