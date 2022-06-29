---
sidebar_position: 1
---
# Scroll component reference

## Handling reference to underlying `ScrollView`, `FlatList` or `SectionList`

All exported components forward refs to underlying scroll component, to access it, just pass ref like when using conventional `ScrollView`, `FlatList` or `SectionList`

```tsx
const paralaxScrollRef = useRef(null);

<StickyHeaderScrollView
  ref={paralaxScrollRef}
  //...
>
  {renderBody()}
</StickyHeaderScrollView>
```
