---
sidebar_position: 1
---

# Custom Tabbed Header

## Tabbed Header Customisation

Example of custom Tabbar Header styling. Whole source code can be found in the summary of this page.

![Tabbed Header Gif](@site/static/img/assets/readme_yoda.gif)

## Custom scrollable tabs

To change tabs to your custom ones, pass `tabs` prop to `TabbedHeaderPager` component, where
`title` is your tab name and then render each tab as a child of `TabbedHeaderPager`:

```tsx
const text = {
  biography: `The bounty hunter known as "the Mandalorian" was dispatched by "the Client" and Imperial Dr. Pershing to capture the Child alive, however the Client would allow the Mandalorian to return the Child dead for a lower price. ...`,
  powers:
    'Grogu was able to harness the mystical energies of the Force on account of being Force-sensitive. One notable display of his power was when he telekinetically lifted a giant mudhorn into the air for a brief time to save Djarin from the charging beast. ...',
  appearances: `
  Star Wars: Galaxy of Heroes
  Star Wars: Squadrons (as toy) (DLC)
  The-Mandalorian-logo.png The Mandalorian - "Chapter 1: The Mandalorian" (First appearance)
  ...`.trim(),
};

const TABS = [
  {
    title: 'Biography',
    description: text.biography,
  },
  {
    title: 'Powers and Abilities',
    description: text.powers,
  },
  {
    title: 'Appearances',
    description: text.appearances,
  },
];

return (
  <TabbedHeaderPager
    //...
    tabs={TABS}
    //...
  >
    {TABS.map((tab, i) => (
      <View key={i} style={...}>
        <Text style={...}>{tab.description}</Text>
      </View>
    ))}
  </TabbedHeaderPager>
)
```

## Custom tab styling

When It comes to tab styling, in TabbedHeader provides following props:

`tabTextStyle` and `tabTextActiveStyle` to pass styles for tab text whether is inactive or active

`tabTextContainerStyle` and `tabTextContainerActiveStyle` to pass styles for tab containers

`tabsContainerBackgroundColor` responsible for backgroundColor of tab bar

`tabWrapperStyle` to pass style for single tab wrapper eg. to change vertical padding

`tabsContainerStyle` to pass style for whole tab bar container eg. to change horizontal padding

```tsx
const styles = StyleSheet.create({
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: 'orange',
  },
  tabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabTextActiveStyle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabWrapperStyle: {
    paddingVertical: 10,
  },
  tabsContainerStyle: {
    paddingHorizontal: 10,
  },
})

return (
  <TabbedHeaderPager
    //...
    tabsContainerBackgroundColor={colors.black}
    tabTextContainerStyle={styles.tabTextContainerStyle}
    tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
    tabTextStyle={styles.tabText}
    tabTextActiveStyle={styles.tabTextActiveStyle}
    tabWrapperStyle={styles.tabWrapperStyle}
    tabsContainerStyle={styles.tabsContainerStyle}
    //...
  >
    {/** content */}
  </TabbedHeaderPager>
)
```

## Custom header foreground

Instead of setting header color by `backgroundColor` prop, we can use `backgroundImage` and pass an image.
In the TabbarHeader example there is a small avatar image and title below, we can set the first one by passing
image to the `foregroundImage` prop.
To customise title, we can pass it by title prop `title="Baby Yoda"` and then pass styles by `titleStyle` prop.

```tsx
const styles = StyleSheet.create({
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 40,
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
})

return (
  <TabbedHeaderPager
    // ...
    backgroundImage={{
      uri: 'https://yoda.jpeg',
    }}
    title="Baby Yoda"
    titleStyle={styles.titleStyle}
    foregroundImage={{
      uri: 'https://starwars.png',
    }}
    // ...
  >
    {/** content */}
  </TabbedHeaderPager>
)
```
## Custom Header component

Instead of passing your own logo to the header, you can create component and pass it to the `renderHeaderBar` prop. It allows you to create back/close button and create custom animations

In the example below there is custom header containing close button which is visible all the time, 
and the title displayed on header, visible only when the header is in closed state.

In order to do this, we save vertical content offset in a Reanimated's shared value and then use it to interpolate opacity value of the View with the title.

```tsx
const HeaderBar = ({ scrollValue }) => {
  //...

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(scrollValue.value, [0, 60, 90], [0, 0, 1], Extrapolate.CLAMP) };
  });

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={...}>
      <View style={...}>
        <TouchableOpacity onPress={...}>
          <Image
            style={...}
            resizeMode="contain"
            source={{
              uri: 'https://close.png',
            }}
          />
        </TouchableOpacity>
        <Animated.View style={animatedStyle}>
          <Text style={...}>Baby Yoda</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const YodaScreen = () => {
  // ...
  const scrollValue = useSharedValue(0);

  function handleScroll(e: NativeScrollEvent) {
    'worklet';
    scrollValue.value = e.contentOffset.y;
  }

  return (
    <TabbedHeaderPager
      // ...
      onScroll={handleScroll}
      renderHeaderBar={() => <HeaderBar scrollValue={scrollValue} />}
    >
      {/** content */}
    </TabbedHeaderPager>
  )
}
```

## Summary - Full source code

Full source code can be found in [example repo](https://github.com/netguru/sticky-parallax-header/blob/master/example/src/screens/YodaScreen/index.tsx)
