---
sidebar_position: 4
---

# Rendering custom (styled) icons

You can pass just React component to `leftTopIcon` & `rightTopIcon` prop in AvatarHeader or DetailsHeader components.

```tsx
<AvatarHeaderScrollView
  leftTopIcon={() => <Image style={styles.customStyle} source={require('./custom-icon.png')} />}
  rightTopIcon={() => <CustomSvgIcon />}
  // ...
>
  {/** content */}
</AvatarHeaderScrollView>
```
