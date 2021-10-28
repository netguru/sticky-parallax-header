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
  <a href="#Docs">Documentation</a> &nbsp;|&nbsp; <a href="#Preview">Preview</a> &nbsp;|&nbsp; <a href="#Installation">Installation</a> &nbsp;|&nbsp; <a href="#Contributing">Contributing</a> &nbsp;|&nbsp; <a href="#Contributors">Contributors</a>
</div>

<h1 id="Docs">Documentation</h1>
Read the full Docs at: <a href="https://netguru.github.io/sticky-parallax-header/">https://netguru.github.io/sticky-parallax-header/</a>

<h1 id="Preview">Preview</h1>
<h2> Features </h2>
Stickyheader.js ships with 3 different use cases for sticky headers and a possibility to create fully custom header!

|                     Tabbed Header                      |                     Avatar Header                      |                      Details Header                      |
| :----------------------------------------------------: | :----------------------------------------------------: | :------------------------------------------------------: |
| ![Tabbed Header Gif](./assets/readme_TabbedHeader.gif) | ![Avatar Header Gif](./assets/readme_AvatarHeader.gif) | ![Details Header Gif](./assets/readme_DetailsHeader.gif) |

## In Use

**Check the live demo on Expo Snack [here](https://snack.expo.io/@maciejbudzinsking/sticky-parallax-header-by-netguru).**

Predefined headers can be accessed through `headerType="HeaderName"` property, each header can be configured according to your demands using the wide amount of properties. You can change all of them, or use it right out of the box with as little changes as possible to use it for your needs.

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

<h1 id="Installation">Installation</h1>

### For React Native >= 0.60.0 use version 0.0.60 and above, for previous React Native versions use 0.0.59

### Installation for React Native >= 0.60.0

Add latest package version

```bash
$ yarn add react-native-sticky-parallax-header
```

### Installation for React Native < 0.60.0

[Installation steps for React Native < 0.60.0](https://netguru.github.io/sticky-parallax-header/docs/introduction/installation#installation-for-react-native--0600-1)

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
