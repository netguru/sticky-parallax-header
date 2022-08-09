---
sidebar_position: 1
---

# Getting Started

`react-native-sticky-parallax-header` is a simple React Native library, enabling to create a fully custom header for your iOS and Android apps.

## Features
`react-native-sticky-parallax-header` ships with 3 different use cases for sticky headers and a possibility to create fully custom header!

| Tabbed Header | Avatar Header | Details Header|
| :------: | :------: | :------: |
| ![Tabbed Header Gif](@site/static/img/assets/readme_TabbedHeader.gif) |![Avatar Header Gif](@site/static/img/assets/readme_AvatarHeader.gif)| ![Details Header Gif](@site/static/img/assets/readme_DetailsHeader.gif)|

## In Use

Predefined headers can be accessed through `headerType="HeaderName"` property, each header can be configured according to your demands using the wide amount of properties. You can change all of them, or use it right out of the box with as little changes as possible to use it for your needs

This is how you can add them in your app:

```tsx
import * as React from 'react'
import StickyParallaxHeader from 'react-native-sticky-parallax-header'

const TestScreen = () => (
  <>
    <StickyParallaxHeader headerType="TabbedHeader" />
    {/* <StickyParallaxHeader headerType="AvatarHeader" /> */}
    {/* <StickyParallaxHeader headerType="DetailsHeader" /> */}
  </>
)
