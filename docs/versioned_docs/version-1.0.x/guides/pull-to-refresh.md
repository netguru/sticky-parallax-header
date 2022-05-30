---
sidebar_position: 2
---
# Pull to refresh

All exported components inherits props of their underlying scroll component, to use default refresh control, just pass `onRefresh` & `refreshing` props. If you want to have custom setup (e.g. custom style), pass component as `refreshControl` prop

```tsx
  <StickyHeaderScrollView
    // ...
    onRefresh={onRefresh}
    refreshing={refreshing}
    // ...
  >
    {/** content */}
  </StickyHeaderScrollView>
```

```tsx
  <StickyHeaderScrollView
    // ...
    refreshControl={
      <RefreshControl
        // z Index is required on IOS, to refresh indicator be visible
        style={{ zIndex: 1 }}
        refreshing={refreshing}
        titleColor="white"
        tintColor="white"
        title="Refreshing"
        onRefresh={onRefresh}
      />
    }
    // ...
  >
    {/** content */}
  </StickyHeaderScrollView>
```

:::warning
using `RefreshControl` on web, can break sticky header layout, because web implementation is just stubbed and doubles ScrollView's margin/padding

to handle that, use it only when platform is not web

```tsx
{...Platform.select({ default: { onRefresh, refreshing }, web: undefined })}
```

```tsx
refreshControl={
  Platform.select({
    default: (
      <RefreshControl
        // z Index is required on IOS, to refresh indicator be visible
        style={{ zIndex: 1 }}
        refreshing={refreshing}
        titleColor="white"
        tintColor="white"
        title="Refreshing"
        onRefresh={onRefresh}
      />
    ),
    web: undefined,
  })
}
```
:::
