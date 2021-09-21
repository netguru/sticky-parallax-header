---
sidebar_position: 4
---
# Rendering icons in tabs

You can pass just React component to `icon` property in tabs object. If you need different active icon use function, example below.

```jsx
<StickyParallaxHeader
  tabs={[
    {
      title: 'Development',
      icon: (active) => (active ? <ActiveIcon /> : <Icon />),
      content: this.renderContent('Popular Quizes'),
    },
  ]}
/>
...
```
