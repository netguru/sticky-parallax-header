# Tabbed Header Customisation

Example of custom Tabbar Header styling. Whole source code can be found in the summary of this page.

![Tabbed Header Gif](../assets/readme_yoda.gif)

## Custom scrollable tabs

To change tabs to your custom ones, pass `tabs` prop to StickyParallaxHeader component, where
`title` is your tab name and `content` is a component to render for specific tab:

```jsx
tabs={[
  {
    title: 'Biography',
    content: renderContent(text)
  },
  {
    title: 'Powers and Abilities',
    content: renderContent(text1)
  },
  {
    title: 'Appearances',
    content: renderContent(text2)
  }
]}
```

Example of such component:

```jsx
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  contentContiner: {
    height: windowHeight,
    padding: 10
  },
  contentText: {
    fontSize: 16
  }
})

const renderContent = x => (
  <View
    style={styles.contentContiner}>
    <Text style={styles.contentText}>{x}</Text>
  </View>
)

```

## Custom tab styling

When It comes to tab styling, in TabbedHeader there are seven props:

`tabTextStyle` and `tabTextActiveStyle` to pass styles for tab text wheter is inactive or active

`tabTextContainerStyle` and `tabTextContainerActiveStyle` to pass styles for tab containers

`backgroundColor` responsible for backgroundColor of whole header and tab bar

`tabWrapperStyle` to pass style for single tab wrapper eg. to change vertical padding

`tabsContainerStyle` to pass style for whole tab bar container eg. to change horizontal padding

```jsx

const styles = StyleSheet.create({
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18
  },
  tabTextContainerActiveStyle: {
    backgroundColor: '#FFC106'
  },
  tabTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white',
  },
  tabTextActiveStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'black',
  },
  tabWrapperStyle: {
    paddingVertical: 10
  },
  tabsContainerStyle: {
    paddingHorizontal: 10
  }
})

return (
  <StickyParallaxHeader
    headerType="TabbedHeader"
    tabTextContainerStyle={styles.tabTextContainerStyle}
    tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
    tabTextStyle={styles.tabTextStyle}
    tabTextActiveStyle={styles.tabTextActiveStyle}
    tabWrapperStyle={styles.tabWrapperStyle}
    tabsContainerStyle={styles.tabsContainerStyle}
    backgroundColor={'black'}
  />
)
```

## Custom header foreground

Instead of setting header color by `backgroundColor` prop, we can use `backgroundImage` and pass an image.
In the TabbarHeader example there is a small avatar image and title below, we can set the first one by passing
image to the `foregroundImage` prop.
To customise title, we can pass it by title prop `title={'Baby Yoda'}` and then pass styles by `titleStyle` prop.

```jsx
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
  <StickyParallaxHeader
    headerType="TabbedHeader"
    backgroundImage={{
      uri: 'https://yoda.jpeg',
    }}
    title={'Baby Yoda'}
    titleStyle={styles.titleStyle}
    foregroundImage={{
      uri:'https://starwars.png'
    }}
  />
)
```
## Custom Header component

Instead of passing your own logo to the header, you can create component and pass It to the `header` prop. It allows you to create back/close button and create custom animations

In the example below there is custom header containing close button which is visible all the time, 
and the title displayed on header, visible only when the header is in closed state.

In order to do this, we used `scrollEvent` prop and `Animated` library to interpolate opacity value 
of the View with the title.

```jsx
const CutomHeaderScreen = () => {

  const renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      inputRange: [0, 60, 90],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    })

    return (
      <View
        style={styles.headerCotainer}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => {}>
            <Image
              style={styles.headerImage}
              resizeMode="contain"
              source={{
                uri: 'https://close.png',
              }}
            />
          </TouchableOpacity>
          <Animated.View style={{ opacity }}>
            <Text
              style={styles.headerText}>
              Baby Yoda
            </Text>
          </Animated.View>
        </View>
      </View>
    )
  }

  return (
    <StickyParallaxHeader
      headerType="TabbedHeader"
      header={renderHeader}
      scrollEvent={event(
        [{ nativeEvent: { contentOffset: { y: scrollY.y } } }],
        { useNativeDriver: false }
      )}
    />
  )
}
```

# Summary - Full source code

```jsx
import React from 'react'
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  StyleSheet
} from 'react-native'
import StickyParallaxHeader from 'react-native-sticky-parallax-header'

const windowHeight = Dimensions.get('window').height
const { event, ValueXY } = Animated
const scrollY = new ValueXY()

const text = {
  biography:`The bounty hunter known as "the Mandalorian" was dispatched by "the Client" and Imperial Dr. Pershing to capture the Child alive, however the Client would allow the Mandalorian to return the Child dead for a lower price.
  The assassin droid IG-11 was also dispatched to terminate him. After working together to storm the encampment the infant was being held in, the Mandalorian and IG-11 found the Child. IG-11 then attempted to terminate the Child. The Mandalorian shot the droid before the he was able to assassinate the Child.
  Shortly after, the Mandalorian took the Child back to his ship. On the way they were attacked by a trio of Trandoshan bounty hunters, who attempted to kill the Child. After the Mandalorian defeated them, he and the Child camped out in the desert for the night. While the Mandalorian sat by the fire, the Child ate one of the creatures moving around nearby. He then approached the bounty hunter and attempted to use the Force to heal one of the Mandalorian's wounds. The Mandalorian stopped him and placed him back into his pod. The next day, the pair made it to the Razor Crest only to find it being scavenged by Jawas. The Mandalorian attacked their sandcrawler for the scavenged parts and attempted to climb it while the Child followed in his pod. However, the Mandalorian was knocked down to the ground`,
  powers: "Powers and Abilities",
  appearances: "Appearances"
}

const styles = StyleSheet.create({
  headerCotainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  headerWrapper: {
    flexDirection: 'row', alignItems: 'center'
  },
  headerImage: {
    width: 20,
    height: 20
  },
  headerText: {
    color: 'white',
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 40,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18
  },
  tabTextContainerActiveStyle: {
    backgroundColor: '#FFC106'
  },
  tabTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white',
  },
  tabTextActiveStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'black',
  },
  tabWrapperStyle: {
    paddingVertical: 10
  },
  tabsContainerStyle: {
    paddingHorizontal: 10
  },
  contentContiner: {
    height: windowHeight,
    padding: 10
  },
  contentText: {
    fontSize: 16
  }
})

const CutomHeaderScreen = () => {

  const renderContent = x => (
    <View
      style={styles.contentContiner}>
      <Text style={styles.contentText}>{x}</Text>
    </View>
  )

  const renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      inputRange: [0, 60, 90],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    })

    return (
      <View
        style={styles.headerCotainer}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => console.warn('CLICKED')}>
            <Image
              style={styles.headerImage}
              resizeMode="contain"
              source={{
                uri:
                  'https://close.png',
              }}
            />
          </TouchableOpacity>
          <Animated.View style={{ opacity }}>
            <Text
              style={styles.headerText}>
              Baby Yoda
            </Text>
          </Animated.View>
        </View>
      </View>
    )
  }

  return (
    <StickyParallaxHeader
      headerType="TabbedHeader"
      backgroundImage={{
        uri: 'https://yoda.jpeg',
      }}
      backgroundColor={'black'}
      header={renderHeader}
      title={'Baby Yoda'}
      titleStyle={styles.titleStyle}
      foregroundImage={{
        uri:
          'https://starwars.png',
      }}
      tabs={[
        {
          title: 'Biography',
          content: renderContent(text.biography)
        },
        {
          title: 'Powers and Abilities',
          content: renderContent(text.powers)
        },
        {
          title: 'Appearances',
          content: renderContent(text.appearances)
        }
      ]}
      tabTextContainerStyle={styles.tabTextContainerStyle}
      tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
      tabTextStyle={styles.tabTextStyle}
      tabTextActiveStyle={styles.tabTextActiveStyle}
      tabWrapperStyle={styles.tabWrapperStyle}
      tabsContainerStyle={styles.tabsContainerStyle}
      scrollEvent={event(
        [{ nativeEvent: { contentOffset: { y: scrollY.y } } }],
        { useNativeDriver: false }
      )}
    />
  )
}
export default CutomHeaderScreen
```
