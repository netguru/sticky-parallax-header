---
sidebar_position: 1
---

# Getting Started

Stickyheader.js is a simple React Native library, enabling to create a fully custom header for your iOS and Android apps.

## Features
Stickyheader.js ships with 3 different use cases for sticky headers and a possibility to create fully custom header!


| Tabbed Header | Avatar Header | Details Header|
| :------: | :------: | :------: |
| ![Tabbed Header Gif](../../static/img/assets/readme_TabbedHeader.gif) |![Avatar Header Gif](../../static/img/assets/readme_AvatarHeader.gif)| ![Details Header Gif](../../static/img/assets/readme_DetailsHeader.gif)|

## In Use

**Check the live demo on Expo Snack [here](https://snack.expo.io/@maciejbudzinsking/sticky-parallax-header-by-netguru).**

<!-- <div data-snack-id="@maciejbudzinsking/sticky-parallax-header-by-netguru" data-snack-platform="web" data-snack-preview="true" data-snack-theme="light" style="overflow:hidden;background:#F9F9F9;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.io/embed.js"></script> -->

Predefined headers can be accessed through `headerType="HeaderName"` property, each header can be configured according to your demands using the wide amount of properties. You can change all of them, or use it right out of the box with as little changes as possible to use it for your needs

This is how you can add them in your app:

```jsx
import React from 'react'
import StickyParallaxHeader from 'react-native-sticky-parallax-header'

const TestScreen = () => (
  <>
    <StickyParallaxHeader headerType="TabbedHeader" />
    {/* <StickyParallaxHeader headerType="AvatarHeader" /> */}
    {/* <StickyParallaxHeader headerType="DetailsHeader" /> */}
  </>
)

export default TestScreen
```
