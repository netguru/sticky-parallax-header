

<div align="center">
  <image align="center" src="./src/assets/images/readme_header.svg"/>
</div>
<div align="center">
  <h1>Stickyheader.js</h1>
</div>

<div align="center">
  <image src="https://app.bitrise.io/app/1ffc1637c8691f4f/status.svg?token=2vMEootz4cobIHmtr5UeYg&branch=develop"/>
  <image src="https://badge.fury.io/js/survey-monkey-streams.svg"/>
  <image src="https://img.shields.io/github/downloads/netguru/sticky-parallax-header/total.svg"/>
</div>
<div align="center">
    <br/><em>Brought with</em> &nbsp;❤️ <em>by</em> &nbsp; <a href="https://www.netguru.com">
        <img align="center" alt="Netguru logo" src='./src/assets/images/readme_netguru_logo.png' width='30'/>
      </a>
</div>


# Introduction 

<p align="center">
  Stickyheader.js is a simple React Native library, enabling to create a fully custom header for your iOS and Android apps.
</p>

<div align="center">
  <a href="#Preview">Preview</a> &nbsp;|&nbsp; <a href="#Getting-Started">Getting Started</a> &nbsp;|&nbsp; <a href="#Usage">Usage</a> &nbsp;|&nbsp; <a href="#Demo">Demo</a>  &nbsp;|&nbsp; <a href="#Contributors">Contributors</a>
</div>


<h1 id="Preview">Preview</h1>
<h2> Features </h2>
Stickyheader.js ships with 3 different use cases for sticky headers and a possibility to create fully custom header!

| Tabbed Header | Avatar Header | Details Header| 
| :------: | :------: | :------: |
| ![Tabbed Header Gif](./src/assets/images/readme_TabbedHeader.gif) |![Avatar Header Gif](./src/assets/images/readme_AvatarHeader.gif)| ![Details Header Gif](./src/assets/images/readme_DetailsHeader.gif)|


## In Use
Predefined headers can be accessed through `headerType="HeaderName"` property, each header can be configured according to your demands using the wide amount of properties. You can change all of them, or use it right out of the box with as little changes as possible to use it for you needs:)

This is how you can add them in your app:

```jsx
import React from 'react'
import StickyParalaxHeader from 'react-native-sticky-parallax-header'

const TestScreen = () => (
  <React.Fragment>
    <StickyParalaxHeader headerType="TabbedHeader" />
    {/* <StickyParalaxHeader headerType="AvatarHeader" /> */}
    {/* <StickyParalaxHeader headerType="DetailsHeader" /> */}
  </React.Fragment>
)

export default TestScreen
```


Below are examples of those components and description of the props they are accepting.

## Tabbed Header

![Tabbed Header Gif](./src/assets/images/readme_Tabbed.gif)

| Property          | Type                  | Optional |  Default                                                                     | Description                                              |
| :---------------: | :--------------------:| :-------:| :---------------------------------------------------------------------------:| :-------------------------------------------------------:| 
| `backgroundColor` | `string`              |    Yes   | `#1ca75d`                                                                    | Header background color                                 |
| `headerHeight`    | `number`              |    Yes   | `ifIphoneX(92, constants.responsiveHeight(13))`                              | Sets height of folded header                             |
| `backgroundImage` | `number`              |    Yes   | `null`                                                                       | Sets header background image                             |
| `title`           | `string`              |    Yes   | `"Mornin' Mark! \nReady for a quiz?"`                                        | Sets header title                                        |
| `bounces`         | `bool`                |    Yes   | `true`                                                                       | Bounces on swiping up                                    |
| `snapToEdge`      | `bool`                |    Yes   | `true`                                                                       | Boolean to fire the function for snap To Edge            |
| `renderBody`      | `func`                |    Yes   | `title => <RenderContent title={title} />`                                   | Function that renders body of the header (can be empty)  |
| `tabs`            | `arrayOf(shape({}))`  |    Yes   | `[{title: 'Popular',content: <RenderContent title="Popular Quizes" />},...]`,| Array with tabs names and content                        |


## Details Header

![Details Header Gif](./src/assets/images/readme_Details.gif)

| Property              | Type                  | Optional |  Default                                                                     | Description                                              |
| :-------------------: | :--------------------:| :-------:| :---------------------------------------------------------------------------:| :-------------------------------------------------------:| 
| `leftTopIconOnPress`  | `func`                |    Yes   | `() => {}`                                                                   | Define action on left top button press                   |
| `rightTopIconOnPress` | `func`                |    Yes   | `() => {}`                                                                   | Define action on right top button press                  |
| `leftTopIcon`         | `number`              |    Yes   | `require('../../assets/icons/iconCloseWhite.png')`                           | Set icon for left top button                             |
| `rightTopIcon`        | `number`              |    Yes   | `require('../../assets/icons/Icon-Menu.png') `                               | Set icon for right top button                            |
| `backgroundColor`     | `string`              |    Yes   | `#1ca75d`                                                                    | Header background color                                  |
| `headerHeight`        | `number`              |    Yes   | `ifIphoneX(92, constants.responsiveHeight(13))`                              | Sets height of folded header                             |
| `backgroundImage`     | `number`              |    Yes   | `null`                                                                       | Sets header background image                             |
| `tag`                 | `string`              |    Yes   | `"Product Designer"`                                                         | Sets header tag name                                     |
| `title`               | `string`              |    Yes   | `"Design System"`                                                            | Sets header title                                        |
| `image`               | `number`              |    Yes   | `require('../../assets/images/photosPortraitBrandon.png')`                   | Sets header image                                        |
| `renderBody`          | `func`                |    Yes   | `title => <RenderContent title={title} />`                                   | Function that renders body of the header (can be empty)  |
| `bounces`             | `bool`                |    Yes   | `true`                                                                       | Bounces on swiping up                                    |
| `snapToEdge`          | `bool`                |    Yes   | `true`                                                                       | Boolean to fire the function for snap To Edge            |
| `hasBorderRadius`     | `bool`                |    Yes   | `true`                                                                       | Adds radius to header's left bottom border               |
| `iconNumber`          | `number`              |    Yes   | `10`                                                                         | Set amount of cards shown on icon                        |


## Avatar Header

![Avatar Header Gif](./src/assets/images/readme_Avatar.gif)

| Property              | Type                  | Optional |  Default                                                                     | Description                                              |
| :-------------------: | :--------------------:| :-------:| :---------------------------------------------------------------------------:| :-------------------------------------------------------:| 
| `leftTopIconOnPress`  | `func`                |    Yes   | `() => {}`                                                                   | Define action on left top button press                   |
| `rightTopIconOnPress` | `func`                |    Yes   | `() => {}`                                                                   | Define action on right top button press                  |
| `leftTopIcon`         | `number`              |    Yes   | `require('../../assets/icons/iconCloseWhite.png')`                           | Set icon for left top button                             |
| `rightTopIcon`        | `number`              |    Yes   | `require('../../assets/icons/Icon-Menu.png') `                               | Set icon for right top button                            |
| `backgroundColor`     | `string`              |    Yes   | `#1ca75d`                                                                    | Header background color                                  |
| `headerHeight`        | `number`              |    Yes   | `ifIphoneX(92, constants.responsiveHeight(13))`                              | Sets height of folded header                             |
| `backgroundImage`     | `number`              |    Yes   | `null`                                                                       | Sets header background image                             |
| `title`               | `string`              |    Yes   | `"Brandon`                                                                   | Sets header title                                        |
| `subtitle`            | `string`              |    Yes   | `"Coffee buff. Web enthusiast. Unapologetic student. Gamer. Avid organizer."`| Sets description(subtitle) section                       |
| `image`               | `number`              |    Yes   | `require('../../assets/images/photosPortraitBrandon.png')`                   | Sets header image                                        |
| `renderBody`          | `func`                |    Yes   | `title => <RenderContent title={title} />`                                   | Function that renders body of the header (can be empty)  |
| `bounces`             | `bool`                |    Yes   | `true`                                                                       | Bounces on swiping up                                    |
| `snapToEdge`          | `bool`                |    Yes   | `true`                                                                       | Boolean to fire the function for snap To Edge            |
| `hasBorderRadius`     | `bool`                |    Yes   | `true`                                                                       | Adds radius to header's left bottom border               |

## Custom Header 
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

<h1 id="Getting-Started">Getting Started</h1>

## Prerequisites
* [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
* [Yarn](https://yarnpkg.com/en/docs/install)
* [node v10.9.0](https://github.com/creationix/nvm)

## Installation
### For React Native >= 0.60.0 use version 0.0.60 and above, for previous React Native versions use 0.0.59
### Installation for React Native >= 0.60.0

Add package
```bash
$ yarn add react-native-sticky-parallax-header
```

Link fonts
```bash
$ react-native link react-native-sticky-parallax-header
```

### Installation for React Native < 0.60.0

Add package
```bash
$ yarn add react-native-sticky-parallax-header
```

In order to make tab bar work, we have to link react-native-nested-scroll-view package.
```bash
$ react-native link react-native-nested-scroll-view
```

Depending on the version of React Native you use, the package can be still making issues for you, you have to install patch-package
```bash
$ yarn add patch-package postinstall-postinstall
```

Then you add this script to your scripts:
```bash
 "scripts": {
+  "postinstall": "patch-package"
 }
```

_After all those steps, just copy a 'patches' folder from this repository and run `yarn` again to apply the patched package.
You're ready to use the package now._

## Running/Development
1. iOS:
```bash
$ react-native run-ios
```

2. Android:
```bash
$ react-native run-android
```

## Running Tests
```bash
$ yarn test
```

## Creating new Pull Request
* remember to add appropriate title, ticket, description
* adding video or screenshot is very beneficial but it's not mandatory
* additionally please remember to add appropriate Pull Request title from following:
  * `[RNS-XX] short description` - for normal feature branches

## Code structure
```
src/
├──assets
├──components
├──constants
├──predefinedComponents
```

## Code Style
* Make sure you are using linter with linting rules defined in ESLint config (.eslinrc)
* Name branch according to your ticket following this pattern: RNS-XX-short_description
* Imports and exports inside `index.js` files eg. `screens/index.js`, `components/index.js` should be alfabetically
* Style names in `ComponentName.styles.js` should be ordered alfabetically

<h1 id="Usage">Usage</h1>

Here is a basic example of how tou can create a custom header:)

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
<h1 id="Demo">Demo</h1>
<img alt="Logo"  src='./src/assets/images/readme_quizlogo.svg' width='60'/>

If you want to test package without installation you can download our [showcase app](https://github.com/netguru/quiz-showcase-rn)

## Tips
In order to nest scrollable component use `scrollEnabled={false}` on it and move all the logic to the header eg. by using `onEndReached` prop.

### Technology stack
| Technology     | Version          |
|----------------|------------------|
| React          | 16.8.6           |
| React Native   | 0.59.8           |


<h1 id="Contributors">Contributors</h1>

<div>

<img alt="Radoslaw" style="border-radius: 30px; margin-right: 5px" src='./src/assets/images/readme_radoslaw@3x.png' width='60'/>

<img alt="Krzysztof" style="border-radius: 30px; margin-right: 5px" src='./src/assets/images/readme_krzysztof@3x.png' width='60'/>

<img alt="Anna" style="border-radius: 30px; margin-right: 5px" src='./src/assets/images/readme_anna@3x.png' width='60'/>

<img alt="Damian" style="border-radius: 30px; margin-right: 5px" src='./src/assets/images/readme_damian@3x.png' width='60'/>

<a href="https://github.com/IdaszakDaniel">
<img alt="Daniel" style="border-radius: 30px; margin-right: 5px" src='./src/assets/images/readme_daniel@3x.png' width='60'/>
</a>

<img alt="Maria" style="border-radius: 30px; margin-right: 5px" src='./src/assets/images/readme_maria@3x.png' width='60'/>

<img alt="Mateusz" style="border-radius: 30px; margin-right: 5px" src='./src/assets/images/readme_mateusz@3x.png' width='60'/>

<img alt="Natalia Muryn" style="border-radius: 30px; margin-right: 5px" src='./src/assets/images/readme_natalia@3x.png' width='60'/>

<a href="https://github.com/Karniej">
<img alt="Pawel" style="border-radius: 30px; margin-right: 5px" src='./src/assets/images/readme_pawel@3x.png' width='60'/>
</a>

<a href="https://www.github.com/kolkol69">
<img alt="Maks Kolodiy" style="border-radius: 30px; margin-right: 5px" src='./src/assets/images/readme_maks@3x.png' width='60'/>
</a>

</div>


# License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT). 
