---
sidebar_position: 1
---

# Custom Tabbed Header

## Tabbed Header Customisation

![Tabbed Header Gif](@site/static/img/assets/readme_yoda.gif)

## Custom scrollable tabs

To change tabs to your custom ones, pass `tabs` prop to `TabbedHeaderPager` component, where
`title` is your tab name and then render each tab as a child of `TabbedHeaderPager`

## Custom tab styling

When It comes to tab styling, in TabbedHeader provides following props:

`tabTextStyle` and `tabTextActiveStyle` to pass styles for tab text whether is inactive or active

`tabTextContainerStyle` and `tabTextContainerActiveStyle` to pass styles for tab containers

`tabsContainerBackgroundColor` responsible for backgroundColor of tab bar

`tabWrapperStyle` to pass style for single tab wrapper eg. to change vertical padding

`tabsContainerStyle` to pass style for whole tab bar container eg. to change horizontal padding

## Custom header foreground

Instead of setting header color by `backgroundColor` prop, we can use `backgroundImage` and pass an image.

In the TabbarHeader example there is a small avatar image and title below, we can set the first one by passing
image to the `foregroundImage` prop.

To customise title, we can pass it by title prop `title="Baby Yoda"` and then pass styles by `titleStyle` prop.

## Custom Header component

Instead of passing your own logo to the header, you can create component and pass it to the `renderHeaderBar` prop. It allows you to create back/close button and create custom animations

In the example below there is custom header containing close button which is visible all the time, 
and the title displayed on header, visible only when the header is in closed state.

In order to do this, we save vertical content offset in a Reanimated's shared value and then use it to interpolate opacity value of the View with the title.

## Example

Full source code can be found in [example repo](https://github.com/netguru/sticky-parallax-header/blob/master/example/src/screens/YodaScreen/index.tsx).

```tsx
const text = {
  biography: `The bounty hunter known as "the Mandalorian" was dispatched by "the Client" and Imperial Dr. Pershing to capture the Child alive, however the Client would allow the Mandalorian to return the Child dead for a lower price.
  The assassin droid IG-11 was also dispatched to terminate him. After working together to storm the encampment the infant was being held in, the Mandalorian and IG-11 found the Child. IG-11 then attempted to terminate the Child. The Mandalorian shot the droid before the he was able to assassinate the Child.
  Shortly after, the Mandalorian took the Child back to his ship. On the way they were attacked by a trio of Trandoshan bounty hunters, who attempted to kill the Child. After the Mandalorian defeated them, he and the Child camped out in the desert for the night. While the Mandalorian sat by the fire, the Child ate one of the creatures moving around nearby. He then approached the bounty hunter and attempted to use the Force to heal one of the Mandalorian's wounds. The Mandalorian stopped him and placed him back into his pod. The next day, the pair made it to the Razor Crest only to find it being scavenged by Jawas. The Mandalorian attacked their sandcrawler for the scavenged parts and attempted to climb it while the Child followed in his pod. However, the Mandalorian was knocked down to the ground`,
  powers:
    'Grogu was able to harness the mystical energies of the Force on account of being Force-sensitive. One notable display of his power was when he telekinetically lifted a giant mudhorn into the air for a brief time to save Djarin from the charging beast. However, performing this feat was very strenuous for Grogu as he subsequently fell unconscious for several hours afterward. He could also use the Force when he became angry, such as when he telekinetically strangled Cara Dune because he believed she was harming Djarin while they were arm-wrestling. He later revealed the ability to heal serious injuries and even cure poisoning by touching the injury and then using the Force, though the act, much like levitating the mudhorn, was incredibly draining. In another notable display of telekinesis, Grogu created a strong barrier using the Force to protect his companions by both blocking and redirecting a stream of fire from an attacking Incinerator trooper.',
  appearances: `
  Star Wars: Galaxy of Heroes
  Star Wars: Squadrons (as toy) (DLC)
  The-Mandalorian-logo.png The Mandalorian - "Chapter 1: The Mandalorian" (First appearance)
  The Mandalorian: Season 1: Volume 1
  Star Wars: The Mandalorian Junior Novel
  The Mandalorian 1
  The-Mandalorian-logo.png The Mandalorian - "Chapter 2: The Child"
  The Mandalorian 2
  The-Mandalorian-logo.png The Mandalorian - "Chapter 3: The Sin"
  The-Mandalorian-logo.png The Mandalorian - "Chapter 4: Sanctuary"
  The-Mandalorian-logo.png The Mandalorian - "Chapter 5: The Gunslinger"
  The-Mandalorian-logo.png The Mandalorian - "Chapter 6: The Prisoner"
  The-Mandalorian-logo.png The Mandalorian - "Chapter 7: The Reckoning"
  The-Mandalorian-logo.png The Mandalorian - "Chapter 8: Redemption"
  The Mandalorian: A Clan of Two
  The Mandalorian: Magnetic Fun
  The Mandalorian: This is the Way
  The-Mandalorian-logo.png The Mandalorian - "Chapter 9: The Marshal"
  Star Wars: The Mandalorian Season 2 Junior Novel
  The Mandalorian: The Path of the Force
  The-Mandalorian-logo.png The Mandalorian - "Chapter 10: The Passenger"
  The-Mandalorian-logo.png The Mandalorian - "Chapter 11: The Heiress"
  The-Mandalorian-logo.png The Mandalorian - "Chapter 12: The Siege"
  The-Mandalorian-logo.png The Mandalorian - "Chapter 13: The Jedi" (First identified as Grogu)
  The-Mandalorian-logo.png The Mandalorian - "Chapter 14: The Tragedy"
  The-Mandalorian-logo.png The Mandalorian - "Chapter 15: The Believer" (Mentioned only)
  The-Mandalorian-logo.png The Mandalorian - "Chapter 16: The Rescue"
  The Book of Boba Fett logo.png The Book of Boba Fett - "Chapter 5: Return of the Mandalorian" (Mentioned only)
  The Book of Boba Fett logo.png The Book of Boba Fett - "Chapter 6: From the Desert Comes a Stranger"
  The Book of Boba Fett logo.png The Book of Boba Fett - "Chapter 7: In the Name of Honor"
  `.trim(),
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

const HeaderBar = ({ scrollValue }) => {
  const navigation = useNavigation();
  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: interpolate(scrollValue.value, [0, 60, 90], [0, 0, 1], Extrapolate.CLAMP) };
  });

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.headerContainer}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={goBack}>
          <Image
            style={styles.headerImage}
            resizeMode="contain"
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/VisualEditor_-_Icon_-_Close_-_white.svg/1200px-VisualEditor_-_Icon_-_Close_-_white.svg.png',
            }}
          />
        </TouchableOpacity>
        <Animated.View style={animatedStyle}>
          <Text style={styles.headerText}>
            Baby Yoda
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const YodaScreen: React.FC = () => {
  const { height: windowHeight } = useWindowDimensions();
  const scrollValue = useSharedValue(0);

  function onScroll(e: NativeScrollEvent) {
    'worklet';
    scrollValue.value = e.contentOffset.y;
  }

  return (
    <>
      <TabbedHeaderPager
        containerStyle={screenStyles.stretchContainer}
        backgroundImage={{
          uri: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
        }}
        title="Baby Yoda"
        titleStyle={styles.titleStyle}
        foregroundImage={{
          uri: 'https://cdn.iconscout.com/icon/free/png-256/starwars-6-569425.png',
        }}
        tabsContainerBackgroundColor={colors.black}
        tabTextContainerStyle={styles.tabTextContainerStyle}
        tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
        tabTextStyle={styles.tabText}
        tabTextActiveStyle={styles.tabTextActiveStyle}
        tabWrapperStyle={styles.tabWrapperStyle}
        tabsContainerStyle={styles.tabsContainerStyle}
        onScroll={onScroll}
        tabs={TABS}
        renderHeaderBar={() => <HeaderBar scrollValue={scrollValue} />}
        showsVerticalScrollIndicator={false}>
        {TABS.map((tab, i) => (
          <View key={i} style={[styles.contentContainer, { height: windowHeight }]}>
            <Text style={[screenStyles.text, styles.contentText]}>
              {tab.description}
            </Text>
          </View>
        ))}
      </TabbedHeaderPager>
      <StatusBar barStyle="light-content" backgroundColor="black" translucent />
    </>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    backgroundColor: colors.semitransparentBlack,
    color: colors.white,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 40,
    padding: 10,
  },
  tabTextContainerStyle: {
    backgroundColor: colors.transparent,
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: colors.activeOrange,
  },
  tabText: {
    color: colors.white,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabTextActiveStyle: {
    color: colors.black,
    fontFamily: 'AvertaStd-Semibold',
    fontSize: 16,
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
  contentContainer: {
    backgroundColor: colors.white,
    padding: 10,
  },
  contentText: {
    fontSize: 16,
  },
});
```
