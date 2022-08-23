---
sidebar_position: 6
---

# Animated color props

To make animated color props use Reanimated hooks to produce shared values that will be applied as a color/background color.

Full example code can be found in [example repo](https://github.com/netguru/sticky-parallax-header/blob/master/example/src/screens/additionalExamples/TabbedHeaderWithAnimatedColors.tsx)

```tsx
const TabbedHeaderWithAnimatedColorsExample: React.FC = () => {
  const isDarkTheme = useColorScheme() === 'dark';

  // Keep track of vertical and horizontal scroll values
  const horizontalScrollValue = useSharedValue(0);
  const scrollValue = useSharedValue(0);
  const onHorizontalScroll = useWorkletCallback((e: NativeScrollEvent) => {
    horizontalScrollValue.value = e.contentOffset.x;
  });
  const onScroll = useWorkletCallback((e: NativeScrollEvent) => {
    scrollValue.value = e.contentOffset.y;
  });

  // Create interpolation configs
  const tabUnderlineColorInterpolateConfig = useInterpolateConfig(
    [0, 1242, 2484],
    [colors.activeOrange, colors.coralPink, colors.detailsBlue],
    ColorSpace.RGB
  );
  const tabsContainerBackgroundColorInterpolateConfig = useInterpolateConfig(
    [0, 800, 1600],
    [colors.primaryGreen, colors.activeOrange, colors.coralPink],
    ColorSpace.RGB
  );

  // Create shared value with color prop based on scroll values
  const tabUnderlineColor = useDerivedValue(() =>
    interpolateSharableColor(horizontalScrollValue.value, tabUnderlineColorInterpolateConfig)
  );
  const tabsContainerBackgroundColor = useDerivedValue(() =>
    interpolateSharableColor(scrollValue.value, tabsContainerBackgroundColorInterpolateConfig)
  );

  return (
    <>
      <TabbedHeaderPager
        contentContainerStyle={[
          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground,
        ]}
        pagerProps={{ onScroll: onHorizontalScroll }} // Keep track of pager's horizontal scroll value
        onScroll={onScroll} // Keep track of vertical scroll value
        tabsContainerBackgroundColor={tabsContainerBackgroundColor} // Apply color prop
        tabUnderlineColor={tabUnderlineColor} // Apply color prop
        containerStyle={screenStyles.stretchContainer}
        backgroundColor={colors.primaryGreen}
        foregroundImage={photosPortraitMe}
        rememberTabScrollPosition
        logo={logo}
        title={"Mornin' Mark! \nReady for a quiz?"}
        titleStyle={screenStyles.text}
        titleTestID={tabbedHeaderTestIDs.title}
        tabs={TABBED_SECTIONS.map((section) => ({
          title: section.title,
          testID: section.tabTestID,
        }))}
        tabTextStyle={screenStyles.text}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {Brandon.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
        <View style={styles.content}>
          {Ewa.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
        <View style={styles.content}>
          {Jennifer.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
        <View style={styles.content}>
          {Brandon.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
        <View style={styles.content}>
          {Ewa.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
        <View style={styles.content}>
          {Jennifer.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
      </TabbedHeaderPager>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryGreen} translucent />
    </>
  );
}
```
