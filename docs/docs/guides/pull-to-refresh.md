---
sidebar_position: 3
---
# Pull to refresh

```jsx
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
  >
```
