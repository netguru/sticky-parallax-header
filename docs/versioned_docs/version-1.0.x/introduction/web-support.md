---
sidebar_position: 5
---

# Web support

`react-native-sticky-parallax-header` is supported in web projects built with [`react-native-web`](https://github.com/necolas/react-native-web) with 2 limitations:

- "snap effect" props are not supported on web, because of lack support for [momentum scroll events](https://github.com/necolas/react-native-web/issues/1021) on `react-native-web`
- using `RefreshControl` on web, can break sticky header layout, because web implementation is just stubbed and doubles ScrollView's margin/padding - [check pull-to-refresh guide](../guides/pull-to-refresh.md)
