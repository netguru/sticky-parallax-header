---
sidebar_position: 2
---
# Handling nested scrollables

## Handling StickyParallaxHeader body ScrollView reference

### As callback function
```
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
```
const paralaxScrollRef = useRef(null);

<StickyParallaxHeader
  scrollRef={paralaxScrollRef}
  foreground={this.renderForeground()}
  header={this.renderHeader()}
>
  {renderBody()}
</StickyParallaxHeader>
```
