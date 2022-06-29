---
sidebar_position: 1
---
# ScrollView reference

## Handling StickyParallaxHeader body ScrollView reference

### As callback function
```tsx
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
```tsx
const paralaxScrollRef = useRef(null);
<StickyParallaxHeader
  scrollRef={paralaxScrollRef}
  foreground={this.renderForeground()}
  header={this.renderHeader()}
>
  {renderBody()}
</StickyParallaxHeader>
```
