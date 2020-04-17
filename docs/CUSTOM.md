# Custom Header 

## Custom Header Props

| Property                         | Type                | Required   | Default   | Description                                                     | 
| :------------------------------: | :-----------------: | :--------: | :-------: | :-------------------------------------------------------------: |
| `background`                     | `node`              | No         | -         | This renders background component                               |
| `backgroundImage`                | `number`            | No         | -         | This renders background image instead of background component   |
| `backgroundColor`                | `string`            | Yes        |`""`       | Header background color                                         |
| `bounces`                        | `bool`              | Yes        | `true`    | Bounces on swiping up                                           |
| `children`                       | `node`              | No         | -         | This renders all the children inside the component              |
| `foreground`                     | `node`              | Yes        | -         | This renders foreground component                               |
| `header`                         | `node`              | Yes        | -         | This renders header component                                   |
| `headerHeight`                   | `number`            | No         | `92`      | Sets height of folded header                                    |
| `headerSize`                     | `func`              | No         | -         | Returns size of header for current device                       |
| `initialPage`                    | `number`            | No         | `0`       | Set initial page of tab bar                                     |
| `onChangeTab`                    | `func`              | No         | -         | Tab change event                                                |
| `onEndReached`                   | `func`              | No         | -         | Tab change event                                                |
| `parallaxHeight`                 | `number`            | No         | `0`       | Sets height of opened header                                    |
| `snapToEdge`                     | `bool`              | No         | `true`    | Boolean to fire the function for snap To Edge                   |
| `scrollEvent`                    | `func`              | No         | -         | Returns offset of header to apply custom animations             |
| `tabs`                           | `arrayOf(string)`   | No         | -         | Array of tab names                                              |
| `tabTextStyle`                   | `shape({})`         | No         | {}        | Text styles of tab                                              |
| `tabTextActiveStyle`             | `shape({})`         | No         | {}        | Text styles of active tab                                       |
| `tabTextContainerStyle`          | `shape({})`         | No         | {}        | Container styles of tab                                         |
| `tabTextContainerActiveStyle`    | `shape({})`         | No         | {}        | Container styles of active tab                                  |
| `tabsContainerBackgroundColor`   | `string`            | No         | -         | Background color of tab bar container                           |
| `tabsWrapperStyle`               | `shape({})`         | No         | {}        | Tabs Wrapper styles                                             |

<h1 id="Usage">Usage</h1>

Here is a basic example of how you can create a custom header

```jsx
import React from 'react'
import { Text, View, Animated, StyleSheet } from 'react-native'
import StickyParallaxHeader from 'react-native-sticky-parallax-header'

const styles = StyleSheet.create({
  content: {
    height: 1000,
    marginTop: 50
  },
  foreground: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  message: {
    color: 'white',
    fontSize: 40,
    paddingTop: 24,
    paddingBottom: 7
  },
  headerWrapper: {
    backgroundColor: 'green',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    margin: 12
  },
  tabsWrapper: {
    paddingVertical: 12
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18
  },
  tabTextContainerActiveStyle: {
    backgroundColor: 'lightgreen'
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white'
  }
})

class TabScreen extends React.Component {
  state = {
    scroll: new Animated.Value(0)
  }

  componentDidMount() {
    const { scroll } = this.state
    scroll.addListener(({ value }) => (this._value = value))
  }

  renderContent = (label) => (
    <View style={styles.content}>
      <Text>{label}</Text>
    </View>
  )

  renderForeground = () => {
    const { scroll } = this.state
    const titleOpacity = scroll.interpolate({
      inputRange: [0, 106, 154],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })

    return (
      <View style={styles.foreground}>
        <Animated.View style={{ opacity: titleOpacity }}>
          <Text style={styles.message}>STICKY HEADER</Text>
        </Animated.View>
      </View>
    )
  }

  renderHeader = () => {
    const { scroll } = this.state
    const opacity = scroll.interpolate({
      inputRange: [0, 160, 210],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })

    return (
      <View style={styles.headerWrapper}>
        <Animated.View style={{ opacity }}>
          <Text style={styles.headerTitle}>STICKY HEADER</Text>
        </Animated.View>
      </View>
    )
  }

  render() {
    const { scroll } = this.state

    return (
      <StickyParallaxHeader
        foreground={this.renderForeground()}
        header={this.renderHeader()}
        parallaxHeight={200}
        headerHeight={90}
        headerSize={() => {}}
        onEndReached={() => {}}
        scrollEvent={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }])}
        tabs={[
          {
            title: 'First Tab',
            content: this.renderContent('FIRST TAB')
          },
          {
            title: 'Second Tab',
            content: this.renderContent('SECOND TAB')
          },
          {
            title: 'Third Tab',
            content: this.renderContent('THIRD TAB')
          },
          {
            title: 'Fourth Tab',
            content: this.renderContent('FOURTH TAB')
          },
          {
            title: 'Fifth Tab',
            content: this.renderContent('FIFTH TAB')
          }
        ]}
        tabTextStyle={styles.tabText}
        tabTextContainerStyle={styles.tabTextContainerStyle}
        tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
        tabsContainerBackgroundColor={'green'}
        tabsWrapperStyle={styles.tabsWrapper}
      >
      </StickyParallaxHeader>
    )
  }
}
```

## Tips
In order to nest scrollable component use `scrollEnabled={false}` on it and move all the logic to the header eg. by using `onEndReached` prop.
