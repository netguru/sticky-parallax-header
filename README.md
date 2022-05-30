<div align="center">
  <image align="center" src="./assets/readme_header.svg"/>
</div>
<div align="center">
  <h1>Sticky Parallax Header</h1>
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
  `react-native-sticky-parallax-header` is a simple React Native library, enabling to create a fully custom header layout for your iOS, Android and web apps.
</p>

<div align="center">
  <a href="#Docs">Documentation</a> &nbsp;|&nbsp; <a href="#Preview">Preview</a> &nbsp;|&nbsp; <a href="#Installation">Installation</a> &nbsp;|&nbsp; <a href="#Contributing">Contributing</a> &nbsp;|&nbsp; <a href="#Contributors">Contributors</a>
</div>

## Documentation <a name="Docs"></a>
Read the full Docs at: <a href="https://netguru.github.io/sticky-parallax-header/">https://netguru.github.io/sticky-parallax-header/</a>

## Preview

Sticky Parallax Header ships with 3 different use cases for sticky headers and a possibility to create fully custom header!

|                     Tabbed Header                      |                     Avatar Header                      |                      Details Header                      |
| :----------------------------------------------------: | :----------------------------------------------------: | :------------------------------------------------------: |
| ![Tabbed Header Gif](./assets/readme_TabbedHeader.gif) | ![Avatar Header Gif](./assets/readme_AvatarHeader.gif) | ![Details Header Gif](./assets/readme_DetailsHeader.gif) |

## In Use

**Check the live demo on Expo Snack [here](https://snack.expo.dev/@netguru_rnd/sticky-parallax-header-example).**

This is how you can display header in your app:

```tsx
import React from 'react'
import { DetailsHeaderScrollView } from 'react-native-sticky-parallax-header'

const TestScreen = () => (
  <>
    <DetailsHeaderScrollView {...scrollProps} {...detailsHeaderProps}>
      {/** scroll view content */}
    </DetailsHeaderScrollView>
  </>
)

export default TestScreen
```

## Installation

### Installation & requirements

:::info
Library supports react-native version 0.64+
:::

#### Install latest library version

```sh
$ yarn add react-native-sticky-parallax-header
```

#### Install library's dependencies

```sh
yarn add react-native-reanimated react-native-safe-area-context react-freeze
```

:::info
If you already use `react-native-screens` version 3.9.0+, `react-freeze` is already included.
:::


<h1 id="Contributing">Contributing</h1>

[Contributing guidelines](readme_pages/CONTRIBUTING.md)

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
