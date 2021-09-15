---
sidebar_position: 1
---

# Shared Props

Below are examples of those components and description of the props they are accepting.

## Shared props

### Tabbed Header, Details Header, Avatar Header

| Property                      | Type                                                  | Optional |  Default                                                                                                                                                                                       | Description                                              |
| :---------------------------: | :---------------------------------------------------: | :-------:| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------:|
| `backgroundColor`             | `string`                                              |    Yes   | `#1ca75d`                                                                                                                                                                                      | Header background color                                  |
| `backgroundImage`             | `number`                                              |    Yes   | `null`                                                                                                                                                                                         | Sets header background image                             |
| `bounces`                     | `bool`                                                |    Yes   | `true`                                                                                                                                                                                         | Bounces on swiping up                                    |
| `contentContainerStyles`                  | `View.propTypes.style`                                 |    Yes   |                                                                                                                                                                                                | Set style for content container                         |
| `headerHeight`                | `number`                                              |    Yes   | `ifIphoneX(92, constants.responsiveHeight(13))`                                                                                                                                                |
| `DEPRECATED_renderBody` | `func` | Yes | `title => <RenderContent title={title} />` | Function that renders body of the header (can be empty). Deprecated: use `children` instead |
| `children` | `ReactElement` | Yes | `<RenderContent />` | Renders body of header (can be empty). Replaces `renderBody`  |
| `snapToEdge`                  | `bool`                                                |    Yes   | `true`                                                                                                                                                                                         | Boolean to fire the function for snap To Edge            |
| `scrollRef`                   | `func or object`                                      |    Yes   | `null`                                                                                                                                                                                         | ScrollView body ref. Allows programmatically scroll body [ScrollView](https://reactnative.dev/docs/scrollview#methods)           |
| `keyboardShouldPersistTaps`   | `'always', 'never', 'handled', false, true`           |    Yes   | `undefined`                                                                                                                                                                                    | Determines when the keyboard should stay visible after a tap.|
| `refreshControl`              | `RefreshControl`           |    Yes   | `undefined`                                                                                                                                                                                    | Props used to add pull to refresh functionality.|
|     `decelerationRate`      |             `number or string`              |   Yes    |                    `"fast"`                     |                                     Set the deceleration rate for the ScrollView. 

### Details Header, Avatar Header

| Property                      | Type                                                  | Optional |  Default                                                                                                                                                                                       | Description                                              |
| :---------------------------: | :---------------------------------------------------: | :-------:| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------:|
 | `hasBorderRadius`     | `boolean`                         |    No    | `true`                                                                       | Adds radius to header's right bottom border               |
 | `image`               | `ImageSourcePropType`                                      |    No    | `require('../../assets/images/photosPortraitBrandon.png')`                   | Sets header image                                        |
 | `leftTopIcon`         | `ImageSourcePropType`             |    No    | `require('../../assets/icons/iconCloseWhite.png')`                           | Set icon for left top button                             |
 | `leftTopIconOnPress`  | `() => void`                      |    No    | `() => {}`                                                                   | Define action on left top button press                   |
 | `rightTopIcon`        | `ImageSourcePropType`                                      |    No    | `require('../../assets/icons/Icon-Menu.png') `                               | Set icon for right top button                            |
 | `rightTopIconOnPress` | `() => void`                      |    No    | `() => {}`                                                                   | Define action on right top button press                  |
