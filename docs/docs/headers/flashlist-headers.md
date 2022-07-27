---
sidebar_position: 6
---

# FlashList Headers

To make [FlashList](https://shopify.github.io/flash-list/docs/) work with react-native-sticky-parallax-header predefined layouts, there are 3 HOCs provided:

- `withAvatarHeaderFlashList`
- `withDetailsHeaderFlashList`
- `withTabbedHeaderFlashList`

## Example usage

```tsx
import { FlashList } from '@shopify/flash-list'
import React from 'react'
import {
  withAvatarHeaderFlashList,
  withDetailsHeaderFlashList,
  withTabbedHeaderFlashList,
} from 'react-native-sticky-parallax-header'

type ItemType = { title: string } // Example data type
type SectionType = string // Example section data type

const AvatarHeaderFlashList = withAvatarHeaderFlashList<ItemType>(FlashList)
const DetailsHeaderFlashList = withDetailsHeaderFlashList<ItemType>(FlashList)
const TabbedHeaderFlashList = withTabbedHeaderFlashList<ItemType | SectionType>(FlashList)

export const TestAvatarHeaderFlashListScreen = () => (
  <>
    <AvatarHeaderFlashList
      {...flashListProps}
      leftTopIcon={require('<path-to-details-left-icon>')}
      image={{ uri: '<path-to-details-image>' }}
      backgroundColor="green"
      subtitle="Details subtitle"
      title="Details title"
    />
  </>
)

export const TestDetailsHeaderFlashListScreen = () => (
  <>
    <DetailsHeaderFlashList
      {...flashListProps}
      leftTopIcon={require('<path-to-details-left-icon>')}
      image={{ uri: '<path-to-details-image>' }}
      backgroundColor="green"
      tag="Details type"
      title="Details title"
    />
  </>
)

const data: (ItemType | SectionType)[] // example data

function isNotEmpty<T>(item: T | null): item is T {
  return item !== null;
}

const stickyHeaderIndices = data
  .map((item, index) => {
    return typeof item === 'string' ? index : null;
  })
  .filter(isNotEmpty);

const tabs = data
  .map((item) => {
    return typeof item === 'string' ? item : null;
  })
  .filter(isNotEmpty);

export const TestTabbedHeaderFlashListScreen = () => (
  <>
    <TabbedHeaderFlashList
      {...flashListProps}
      data={data}
      renderItem={({ item }) => {
        if (typeof item === 'string') {
          return // render section header
        }

        return // render section item
      }}
      getItemType={(item) => {
        return typeof item === 'string' ? 'sectionHeader' : 'row';
      }}
      estimatedItemSize={200}
      stickyHeaderIndices={stickyHeaderIndices}
      tabs={tabs}
    />
  </>
)
```

## Props

### AvatarHeaderFlashList props

Inherits [FlashListProps](https://shopify.github.io/flash-list/docs/usage) and [Shared AvatarHeader props](./avatar-header.md#shared-avatarheader-props)

### DetailsHeaderFlashList props

Inherits [FlashListProps](https://shopify.github.io/flash-list/docs/usage) and [Shared DetailsHeader props](./details-header.md#shared-detailsheader-props)

### TabbedHeaderFlashList props

Inherits [FlashListProps](https://shopify.github.io/flash-list/docs/usage) and [TabbedHeaderList props](./tabbed-header-list.md#props)
