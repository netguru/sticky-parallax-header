# Custom Header 

## Custom Header Props

| Property                         | Type                                                                  | Required   | Default   | Description                                                     | 
| :------------------------------: | :-------------------------------------------------------------------: | :--------: | :-------: | :-------------------------------------------------------------: |
| `backgroundColor`                | `string`                                                              |     Yes    | `""`       | Header background color                                        |
| `backgroundImage`                | `ImageSourcePropType`                                                 |     No     | -         | This renders background image instead of background component   |
| `background`                     | `ReactElement`                                                        |     No     | -         | This renders background component                               |
| `bounces`                        | `boolean`                                                             |     Yes    | `true`    | Bounces on swiping up                                           |
| `children`                       | `ReactElement`                                                        |     No     | -         | This renders all the children inside the component              |
| `foreground`                     | `ReactElement`                                                        |     Yes    | -         | This renders foreground component                               |
| `headerHeight`                   | `number`                                                              |     No     | `92`      | Sets height of folded header                                    |
| `headerSize`                     | `({ x, y, width, height }: HeaderSizeProps) => void`                  |     No     | -         | Handler that is called when header's size changes               |
| `header`                         | `ReactElement`                                                        |     Yes    | -         | This renders header component                                   |
| `initialPage`                    | `number`                                                              |     No     | `0`       | Set initial page of tab bar                                     |
| `onChangeTab`                    | `({ i, ref, from }: { from: number; i: number; ref: any; }) => void;` |     No     | -         | Tab change event                                                |
| `onEndReached`                   | `() => void`                                                          |     No     | -         | Reached end event    
| `onTopReached`                   | `() => void`                                                          |     No     | -         | Reached top event                                               |
| `parallaxHeight`                 | `number`                                                              |     No     | `0`       | Sets height of opened header                                    |
| `scrollEvent`                    | `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`            |     No     | -         | Returns offset of header to apply custom animations             |
| `snapStartThreshold`             | `number`                                                              |     No     | -         | Set start value Threshold of snap                               |
| `snapStopThreshold`              | `number`                                                              |     No     | -         | Set stop value Threshold of snap                                |
| `snapToEdge`                     | `boolean`                                                             |     No     | `true`    | Boolean to fire the function for snap To Edge                   |
| `snapValue`                      | `number`                                                              |     No     | -         | Set value where header is closed                                |
| `tabTextActiveStyle`             | `TextStyle`                                                           |     No     | {}        | Text styles of active tab                                       |
| `tabTextContainerActiveStyle`    | `ViewStyle`                                                           |     No     | {}        | Container styles of active tab                                  |
| `tabTextContainerStyle`          | `ViewStyle`                                                           |     No     | {}        | Container styles of tab                                         |
| `tabTextStyle`                   | `TextStyle`                                                           |     No     | {}        | Text styles of tab                                              |
| `tabsContainerBackgroundColor`   | `ViewStyle`                                                           |     No     | -         | Background color of tab bar container                           |
| `tabsWrapperStyle`               | `ViewStyle`                                                           |     No     | {}        | Tabs Wrapper styles                                             |
| `tabs`                           | `{ content: ReactElement; title: string; }[]`                         |     No     | -         | Array of tab names                                              |
| `tabsContainerStyle`             | `ViewStyle`                                                           |     No     | -         | Set whole tab bar container style                               |
| `transparentHeader`              | `boolean`                                                             |     No     | `false`   | Set header transparency to render custom header                 |

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
In order to nest scrollable component use `scrollEnabled={false}` on it and move all the logic to the header eg. by using `onEndReached` and `onTopReached` props. You can find example in CardScreen.js it's really basic so probably you will want to extend it somehow:

```jsx

  shouldBeEnabled = () => {
    const {
      endReached,
      stickyHeaderEndReached,
      topReached,
      stickyHeaderTopReached
    } = this.state
    const bottomCondition =
      endReached && stickyHeaderEndReached
    const topCondition =
      topReached && stickyHeaderTopReached
    return bottomCondition || !topCondition
  }

  onScroll = ({nativeEvent}) => {
    const {contentOffset, layoutMeasurement, contentSize} = nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      this.setState({endReached: true, topReached: false})
    }

    if (contentOffset.y <= 0) {
      this.setState({topReached: true, endReached: false, stickyHeaderTopReached:true})
    }
  }

  renderFlatlistContent = (user) => (
    <View style={styles.flatlistContainer}>
      <FlatList
        data={user.cards}
        renderItem={({item, index}) => (
          <QuizCard
            data={item}
            num={index}
            key={item.question}
            cardsAmount={100}
          />
        )}
        onScroll={this.onScroll}
        scrollEnabled={
          Platform.OS === 'android' ? true : this.shouldBeEnabled()
        }
        nestedScrollEnabled
      />
    </View>
  )
  ```
###Changing StatusBar style
To override status bar, place **`<StatusBar>`** component below **`<StickyParallaxHeader>`**

Example:
```jsx
<>
  <StickyParallaxHeader headerType="AvatarHeader"/>
  <StatusBar barStyle="dark-content" backgroundColor="red" />
</>
```

### Pull to Refresh
```
 <StickyParallaxHeader
  refreshControl={
    <RefreshControl
      //  z Index is required on IOS, to refresh indicator be visible
      style={{ zIndex: 1 }}
      refreshing={refreshing}
      titleColor="white"
      tintColor="white"
      title="Refreshing"
      onRefresh={this.onRefresh}
    />
  }
  ...
  >
...
```

### Icons in tabs
You can pass just React component to `icon` property in tabs object. If you need different active icon use function, example below.
```
<StickyParallaxHeader
  tabs={[
    {
      title: 'Development',
      icon: (active) => (active ? <ActiveIcon /> : <Icon />),
      content: this.renderContent('Popular Quizes'),
    },
  ]}
/>
...
```


