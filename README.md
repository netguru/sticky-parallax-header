<div align="center">
  <image align="center" src="./assets/readme_header.svg"/>
</div>
<div align="center">
  <h1>Stickyheader.js</h1>
</div>

<div align="center">
  <image src="https://app.bitrise.io/app/1ffc1637c8691f4f/status.svg?token=2vMEootz4cobIHmtr5UeYg&branch=develop"/>
  <image src="https://badge.fury.io/js/react-native-sticky-parallax-header.svg"/>
  <image src="https://img.shields.io/npm/dt/react-native-sticky-parallax-header"/>
</div>
<div align="center">
    <br/><em>Brought with</em> &nbsp;❤️ <em>by</em> &nbsp; <a href="https://www.netguru.com">
        <img align="center" alt="Netguru logo" src='./assets/readme_netguru_logo.png' width='30'/>
      </a>
</div>

# Introduction

<p align="center">
  Stickyheader.js is a simple React Native library, enabling to create a fully custom header for your iOS and Android apps.
</p>

<div align="center">
  <a href="#Preview">Preview</a> &nbsp;|&nbsp; <a href="#Getting-Started">Getting Started</a> &nbsp;|&nbsp; <a href="#Contributing">Contributing</a> &nbsp;|&nbsp; <a href="#Contributors">Contributors</a>
</div>

<h1 id="Preview">Preview</h1>
<h2> Features </h2>
Stickyheader.js ships with 3 different use cases for sticky headers and a possibility to create fully custom header!

|                     Tabbed Header                      |                     Avatar Header                      |                      Details Header                      |
| :----------------------------------------------------: | :----------------------------------------------------: | :------------------------------------------------------: |
| ![Tabbed Header Gif](./assets/readme_TabbedHeader.gif) | ![Avatar Header Gif](./assets/readme_AvatarHeader.gif) | ![Details Header Gif](./assets/readme_DetailsHeader.gif) |

## In Use

**Check the live demo on Expo Snack [here](https://snack.expo.io/@maciejbudzinsking/sticky-parallax-header-by-netguru).**

Predefined headers can be accessed through `headerType="HeaderName"` property, each header can be configured according to your demands using the wide amount of properties. You can change all of them, or use it right out of the box with as little changes as possible to use it for your needs

This is how you can add them in your app:

```jsx
import React from 'react';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';

const TestScreen = () => (
  <>
    <StickyParallaxHeader headerType="TabbedHeader" />
    {/* <StickyParallaxHeader headerType="AvatarHeader" /> */}
    {/* <StickyParallaxHeader headerType="DetailsHeader" /> */}
  </>
);

export default TestScreen;
```

Below are examples of those components and description of the props they are accepting.

## Tabbed Header

![Tabbed Header Gif](./assets/readme_Tabbed.gif)

|             Property             |                                                    Type                                                     | Optional |                                             Default                                              |                                          Description                                          |
| :------------------------------: | :---------------------------------------------------------------------------------------------------------: | :------: | :----------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
|           `headerType`           |                                               `TabbedHeader`                                                |    No    |                                          `TabbedHeader`                                          |                                Set header type to TabbedHeader                                |
|        `backgroundColor`         |                                                  `string`                                                   |   Yes    |                                           `'#1ca75d'`                                            |                                    Header background color                                    |
|        ` backgroundImage`        |                                            `ImageSourcePropType`                                            |   Yes    |                                                                                                  |                                Header background image source                                 |
|            `bounces`             |                                                  `boolean`                                                  |   Yes    |                                              `true`                                              |                                Allow scroll view bounces (IOS)                                |
|    `horizontalScrollBounces`     |                                                  `boolean`                                                  |   Yes    |                                              `true`                                              |                          Allow horizontal scroll view bounces (IOS)                           |
|     `contentContainerStyles`     |                                           `StyleProp<ViewStyle>`                                            |   Yes    |                                                                                                  |                                  Set scroll view body styles                                  |
|        `foregroundImage`         |                                            `ImageSourcePropType`                                            |   Yes    |                                                                                                  |                                    Set tabbed header image                                    |
|          `headerHeight`          |                                                  `number`                                                   |   Yes    |                         `ifIphoneX(92, constants.responsiveHeight(13))`                          |                                       Set header height                                       |
|             `header`             |                                                  `element`                                                  |   Yes    |                                                                                                  |                                 Set custom top header content                                 |
|           `headerSize`           |                                       `(h: LayoutRectangle) => void`                                        |   Yes    |                                                                                                  |                       Handler that is called when header's size changes                       |
|          `initialPage`           |                                                  `number`                                                   |   Yes    |                                               `0`                                                |                                  Set initial page of tab bar                                  |
|   `keyboardShouldPersistTaps`    |                                   `boolean, "always", "never", "handled"`                                   |   Yes    |                                                                                                  |                               Set keyboard persist taps method                                |
|              `logo`              |                                            `ImageSourcePropType`                                            |   Yes    |                                                                                                  |                                 Top right header image source                                 |
|       `logoContainerStyle`       |                                           `StyleProp<ViewStyle>`                                            |   Yes    |                                                                                                  |                            Top right header image container style                             |
|         `logoResizeMode`         |                                              `ImageResizeMode`                                              |   Yes    |                                            `contain`                                             |                            Set top right header image resize mode                             |
|           `logoStyle`            |                                           `StyleProp<ImageStyle>`                                           |   Yes    |                                                                                                  |                               Set top right header image style                                |
|          `onChangeTab`           |                                       `(tab: MountedTabType) => void`                                       |   Yes    |                                                                                                  |                       Callback is called every time when tab is changed                       |
|     `onMomentumScrollBegin`      |                         `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`                          |   Yes    |                                                                                                  | Called when the momentum scroll starts (scroll which occurs as the ScrollView starts gliding) |
|      `onMomentumScrollEnd`       |                         `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`                          |   Yes    |                                                                                                  | Called when the momentum scroll ends (scroll which occurs as the ScrollView glides to a stop) |
|             `onRef`              |                             `(t: null, StickyParallaxHeaderComponent) => void`                              |   Yes    |                                                                                                  |                         Obtain ref for StickyParallaxHeaderComponent                          |
|         `parallaxHeight`         |                                                  `number`                                                   |   Yes    |            `ifIphoneX(constants.responsiveHeight(38),constants.responsiveHeight(48))`            |                                  Set parallax header height                                   |
|         `refreshControl`         |                                                  `element`                                                  |   Yes    |                                                                                                  |           A RefreshControl component, used to provide pull-to-refresh functionality           |
|   `rememberTabScrollPosition`    |                                                   `bool`                                                    |   Yes    |                                             `false`                                              |                 When switching between tabs remember current scroll position                  |
|          `scrollEvent`           |                         ` (event: NativeSyntheticEvent<NativeScrollEvent>) => void`                         |   Yes    |                                                                                                  |           Fires at most once per frame during scrolling (Used in custom animations)           |
|           `scrollRef`            |                       `(t: ScrollView) => void` &#124; `MutableRefObject<ScrollView>`                       |   Yes    |                                                                                                  |                                   Get inner ScrollView ref                                    |
|       `snapStartThreshold`       |                                                  `number`                                                   |   Yes    |                                                                                                  |                               Set start value Threshold of snap                               |
|       `snapStopThreshold`        |                                                  `number`                                                   |   Yes    |                                                                                                  |                               Set stop value Threshold of snap                                |
|           `snapToEdge`           |                                                  `boolean`                                                  |   Yes    |                                              `true`                                              |                    Should snap header to edge when snap value is exceeded                     |
|           `snapValue`            |                                                  `boolean`                                                  |   Yes    |                                     `parralax header height`                                     |                               Set value where header is closed                                |
|       `tabTextActiveStyle`       |                                           `StyleProp<TextStyle>`                                            |   Yes    | `{fontSize: 16, lineHeight: 20, paddingHorizontal: 12, paddingVertical: 8, color: colors.white}` |                                  Set active tab text styles                                   |
|  `tabTextContainerActiveStyle`   |                                           `StyleProp<ViewStyle>`                                            |   Yes    |                               `{backgroundColor: colors.darkMint}`                               |                                Set active tab container style                                 |
|          `tabTextStyle`          |                                           `StyleProp<TextStyle>`                                            |   Yes    | `{fontSize: 16, lineHeight: 20, paddingHorizontal: 12, paddingVertical: 8, color: colors.white}` |                                    Set inactive tab style                                     |
|     `tabTextContainerStyle`      |                                           `StyleProp<ViewStyle>`                                            |   Yes    |                    `{backgroundColor: colors.transparent, borderRadius: 18}`                     |                               Set inactive tab container style                                |
|        `tabWrapperStyle`         |                                           `StyleProp<ViewStyle>`                                            |   Yes    |                                     `{paddingVertical: 12}`                                      |                                Set single tab container style                                 |
|              `tabs`              | `{ content: ReactElement;title?: string;icon?: ReactElement` &#124; `(isActive: boolean) => ReactElement);` |   Yes    |                                                                                                  |                      Array with tabs names, icons and content to render                       |
|       `tabsContainerStyle`       |                                            `ViewPropTypes.style`                                            |   Yes    |                                                                                                  |                               Set whole tab bar container style                               |
|       `tabUnderlineColor`        |                                           `string` &#124; `null`                                            |   Yes    |                                            `"white"`                                             |                        Animated underline color (to disable use null)                         |
| `tabsContainerHorizontalPadding` |                                                  `number`                                                   |   Yes    |                                               `20`                                               |                           Padding from screen edge to tab bar items                           |
|             `title`              |                                                  `string`                                                   |   Yes    |                                                                                                  |                                       Sets header title                                       |
|           `titleStyle`           |                                           `StyleProp<TextStyle>`                                            |   Yes    |                                                                                                  |                               Set style for text in foreground                                |

[Check how to customise Tabbed Header example](docs/TABBEDHEADER.MD)

## Details Header

![Details Header Gif](./assets/readme_Details.gif)

|          Property           |                              Type                               | Optional |                                  Default                                   |                                          Description                                          |
| :-------------------------: | :-------------------------------------------------------------: | :------: | :------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
|        `headerType`         |                         `DetailsHeader`                         |   Yes    |                               `TabbedHeader`                               |                                Set header type to TabbedHeader                                |
|      `backgroundColor`      |                            `string`                             |   Yes    |                                `'#1ca75d'`                                 |                                    Header background color                                    |
|     ` backgroundImage`      |                      `ImageSourcePropType`                      |   Yes    |                                                                            |                                Header background image source                                 |
|          `bounces`          |                            `boolean`                            |   Yes    |                                   `true`                                   |                                Allow scroll view bounces (IOS)                                |
|    `horizontalScrollBounces`     |                                                  `boolean`                                                  |   Yes    |                                              `true`                                              |                          Allow horizontal scroll view bounces (IOS)                           |
|            `tag`            |                            `string`                             |   Yes    |                                                                            |                                     Sets header tag name                                      |
|           `title`           |                            `string`                             |   Yes    |                                                                            |                                       Sets header title                                       |
|         `children`          |                           `ReactNode`                           |   Yes    |                                                                            |                               Render content inside ScrollView                                |
|  `contentContainerStyles`   |                     `StyleProp<ViewStyle>`                      |   Yes    |                                                                            |                                  Set scroll view body styles                                  |
|        `contentIcon`        |                      `ImageSourcePropType`                      |   Yes    |                                                                            |                                       Sets content icon                                       |
|     `contentIconNumber`     |                            `number`                             |   Yes    |                                                                            |                          Sets amount of cards shown on content icon                           |
|      `hasBorderRadius`      |                            `boolean`                            |   Yes    |                                   `true`                                   |                          Adds radius to header's right bottom border                          |
|       `headerHeight`        |                            `number`                             |   Yes    |              `ifIphoneX(92, constants.responsiveHeight(13))`               |                                       Set header height                                       |
|        `headerSize`         |                 `(h: LayoutRectangle) => void`                  |   Yes    |             Handler that is called when header's size changes              |
|           `image`           |                      `ImageSourcePropType`                      |   Yes    |                                                                            |                                       Sets header image                                       |
| `keyboardShouldPersistTaps` |             `boolean, "always", "never", "handled"`             |   Yes    |                                                                            |                               Set keyboard persist taps method                                |
|        `leftTopIcon`        |                      `ImageSourcePropType`                      |   Yes    |                                                                            |                                 Set icon for left top button                                  |
|    `leftTopIconOnPress`     |                          `() => void`                           |   Yes    |                                                                            |                            Define action on left top button press                             |
|       `rightTopIcon`        |                      `ImageSourcePropType`                      |   Yes    |                                                                            |                                 Set icon for right top button                                 |
|    `rightTopIconOnPress`    |                          `() => void`                           |   Yes    |                                                                            |                            Define action on right top button press                            |
|   `onMomentumScrollBegin`   |   `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`    |   Yes    |                                                                            | Called when the momentum scroll starts (scroll which occurs as the ScrollView starts gliding) |
|    `onMomentumScrollEnd`    |   `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`    |   Yes    |                                                                            | Called when the momentum scroll ends (scroll which occurs as the ScrollView glides to a stop) |
|           `onRef`           |       `(t: null, StickyParallaxHeaderComponent) => void`        |   Yes    |                                                                            |                         Obtain ref for StickyParallaxHeaderComponent                          |
|      `parallaxHeight`       |                            `number`                             |   Yes    | `ifIphoneX(constants.responsiveHeight(38),constants.responsiveHeight(48))` |                                  Set parallax header height                                   |
|      `refreshControl`       |                            `element`                            |   Yes    |                                                                            |           A RefreshControl component, used to provide pull-to-refresh functionality           |
|        `scrollEvent`        |   ` (event: NativeSyntheticEvent<NativeScrollEvent>) => void`   |   Yes    |                                                                            |           Fires at most once per frame during scrolling (Used in custom animations)           |
|         `scrollRef`         | `(t: ScrollView) => void` &#124; `MutableRefObject<ScrollView>` |   Yes    |                                                                            |                                   Get inner ScrollView ref                                    |
|    `snapStartThreshold`     |                            `number`                             |   Yes    |                                                                            |                               Set start value Threshold of snap                               |
|     `snapStopThreshold`     |                            `number`                             |   Yes    |                                                                            |                               Set stop value Threshold of snap                                |
|        `snapToEdge`         |                            `boolean`                            |   Yes    |                                   `true`                                   |                    Should snap header to edge when snap value is exceeded                     |
|         `snapValue`         |                            `boolean`                            |   Yes    |                          `parralax header height`                          |                               Set value where header is closed                                |

## Avatar Header

![Avatar Header Gif](./assets/readme_Avatar.gif)

|         Property         |                              Type                               | Optional |                                  Default                                   |                                          Description                                          |
| :----------------------: | :-------------------------------------------------------------: | :------: | :------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
|       `headerType`       |                         `DetailsHeader`                         |   Yes    |                               `TabbedHeader`                               |                                Set header type to TabbedHeader                                |
|    `backgroundColor`     |                            `string`                             |   Yes    |                                `'#1ca75d'`                                 |                                    Header background color                                    |
|    ` backgroundImage`    |                      `ImageSourcePropType`                      |   Yes    |                                                                            |                                Header background image source                                 |
|        `bounces`         |                            `boolean`                            |   Yes    |                                   `true`                                   |                                Allow scroll view bounces (IOS)                                |
|    `horizontalScrollBounces`     |                                                  `boolean`                                                  |   Yes    |                                              `true`                                              |                          Allow horizontal scroll view bounces (IOS)                           |
|        `children`        |                           `ReactNode`                           |   Yes    |                                                                            |                               Render content inside ScrollView                                |
| `contentContainerStyles` |                     `StyleProp<ViewStyle>`                      |   Yes    |                                                                            |                                  Set scroll view body styles                                  |
|    `hasBorderRadius`     |                            `boolean`                            |   Yes    |                                   `true`                                   |                          Adds radius to header's right bottom border                          |
|      `headerHeight`      |                            `number`                             |   Yes    |              `ifIphoneX(92, constants.responsiveHeight(13))`               |                                       Set header height                                       |
|       `headerSize`       |                 `(h: LayoutRectangle) => void`                  |   Yes    |                                                                            |                       Handler that is called when header's size changes                       |
|         `image`          |                      `ImageSourcePropType`                      |   Yes    |                                                                            |                                       Sets header image                                       |
|      `leftTopIcon`       |                      `ImageSourcePropType`                      |   Yes    |                                                                            |                                 Set icon for left top button                                  |
|   `leftTopIconOnPress`   |                          `() => void`                           |   Yes    |                                                                            |                            Define action on left top button press                             |
|      `rightTopIcon`      |                      `ImageSourcePropType`                      |   Yes    |                                                                            |                                 Set icon for right top button                                 |
|  `rightTopIconOnPress`   |                          `() => void`                           |   Yes    |                                                                            |                            Define action on right top button press                            |
| `onMomentumScrollBegin`  |   `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`    |   Yes    |                                                                            | Called when the momentum scroll starts (scroll which occurs as the ScrollView starts gliding) |
|  `onMomentumScrollEnd`   |   `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`    |   Yes    |                                                                            | Called when the momentum scroll ends (scroll which occurs as the ScrollView glides to a stop) |
|     `parallaxHeight`     |                            `number`                             |   Yes    | `ifIphoneX(constants.responsiveHeight(38),constants.responsiveHeight(48))` |                                  Set parallax header height                                   |
|     `refreshControl`     |                            `element`                            |   Yes    |                                                                            |           A RefreshControl component, used to provide pull-to-refresh functionality           |
|      `scrollEvent`       |   ` (event: NativeSyntheticEvent<NativeScrollEvent>) => void`   |   Yes    |                                                                            |           Fires at most once per frame during scrolling (Used in custom animations)           |
|       `scrollRef`        | `(t: ScrollView) => void` &#124; `MutableRefObject<ScrollView>` |   Yes    |                                                                            |                                   Get inner ScrollView ref                                    |
|   `snapStartThreshold`   |                            `number`                             |   Yes    |                                                                            |                               Set start value Threshold of snap                               |
|   `snapStopThreshold`    |                            `number`                             |   Yes    |                                                                            |                               Set stop value Threshold of snap                                |
|       `snapToEdge`       |                            `boolean`                            |   Yes    |                                   `true`                                   |                    Should snap header to edge when snap value is exceeded                     |
|       `snapValue`        |                            `boolean`                            |   Yes    |                          `parralax header height`                          |                               Set value where header is closed                                |
|        `subtitle`        |                            `string`                             |   Yes    |                                                                            |                                     Sets header subtitle                                      |
|         `title`          |                            `string`                             |   Yes    |                                                                            |                                       Sets header title                                       |

## Custom Header

[Custom header props and example](docs/CUSTOM.md)

## Handling StickyParallaxHeader body ScrollView reference

### As callback function

```
<StickyParallaxHeader
  scrollRef={(ref) => {
    paralaxScrollRef.current = ref;
  }}
  foreground={this.renderForeground()}
  header={this.renderHeader()}
>
  {renderBody()}
</StickyParallaxHeader>
```

### As useRef value

```
const paralaxScrollRef = useRef(null);

<StickyParallaxHeader
  scrollRef={paralaxScrollRef}
  foreground={this.renderForeground()}
  header={this.renderHeader()}
>
  {renderBody()}
</StickyParallaxHeader>
```

## Handling nested scrollables

[Handling nested flatlist props and example](docs/CUSTOM.md#Tips)

## Changing Statusbar style

[Changing StatusBar style](docs/CUSTOM.md#changing-statusbar-style)

## Pull to refresh

[Pull to refresh](docs/CUSTOM.md#Pull-to-Refresh)

## Rendering icons in tabs

[Icons in tabs](docs/CUSTOM.md#Icons-in-tabs)

<h1 id="Getting-Started">Getting Started</h1>

## Prerequisites

- [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [node v10.9.0](https://github.com/creationix/nvm)

## Installation

### For React Native >= 0.60.0 use version 0.0.60 and above, for previous React Native versions use 0.0.59

### Installation for React Native >= 0.60.0

Add latest package version

```bash
$ yarn add react-native-sticky-parallax-header
```

### Installation for React Native < 0.60.0

[Installation steps for React Native < 0.60.0](docs/INSTALLATION.md)

<h1 id="Contributing">Contributing</h1>

[Contributing guidelines](docs_old/CONTRIBUTING.md)

<h1 id="Contributors">Contributors</h1>

<div>

<img alt="Radoslaw" style="border-radius: 30px; margin-right: 5px" src='./assets/readme_radoslaw@3x.png' width='60'/>

<img alt="Krzysztof" style="border-radius: 30px; margin-right: 5px" src='./assets/readme_krzysztof@3x.png' width='60'/>

<img alt="Anna" style="border-radius: 30px; margin-right: 5px" src='./assets/readme_anna@3x.png' width='60'/>

<img alt="Damian" style="border-radius: 30px; margin-right: 5px" src='./assets/readme_damian@3x.png' width='60'/>

<a href="https://github.com/IdaszakDaniel">
<img alt="Daniel" style="border-radius: 30px; margin-right: 5px" src='./assets/readme_daniel@3x.png' width='60'/>
</a>

<img alt="Maria" style="border-radius: 30px; margin-right: 5px" src='./assets/readme_maria@3x.png' width='60'/>

<img alt="Mateusz" style="border-radius: 30px; margin-right: 5px" src='./assets/readme_mateusz@3x.png' width='60'/>

<img alt="Natalia Muryn" style="border-radius: 30px; margin-right: 5px" src='./assets/readme_natalia@3x.png' width='60'/>

<a href="https://github.com/Karniej">
<img alt="Pawel" style="border-radius: 30px; margin-right: 5px" src='./assets/readme_pawel@3x.png' width='60'/>
</a>

<a href="https://www.github.com/kolkol69">
<img alt="Maks Kolodiy" style="border-radius: 30px; margin-right: 5px" src='./assets/readme_maks@3x.png' width='60'/>
</a>

</div>

# License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
