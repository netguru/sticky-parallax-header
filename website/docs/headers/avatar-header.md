---
sidebar_position: 4
---

# Avatar Header

![Avatar Header Gif](../../static/img/assets/readme_Avatar.gif)

| Property              | Type                                                       | Optional |  Default                                                                     | Description                                              |
| :-------------------: | :---------------------------------------------------------:| :-------:| :---------------------------------------------------------------------------:| :-------------------------------------------------------:|
 | `foreground`          | `() => ReactElement`                                       |    No    | -                                                                            | Function that renders the foreground of the header       |
| `header`              | `() => ReactElement`                                       |    No    | -                                                                            | Function that renders custom header                      |
| `parallaxHeight`      | `number`                                                   |    No    | -                                                                            | Set parallax header height                               |
 | `scrollEvent`         | `(event: NativeSyntheticEvent<NativeScrollEvent>) => void` |    No    | `require('../../assets/icons/Icon-Menu.png') `                               | Scroll event to apply custom animations                  |
| `snapStartThreshold`  | `number`                                                   |    No    | -                                                                            | Set start value Threshold of snap                        |
 | `snapStopThreshold`   | `number`                                                   |    No    | -                                                                            | Set stop value Threshold of snap                         |
| `snapValue`           | `number`                                                   |    No    | -                                                                            | Set value where header is closed                         |
| `subtitle`            | `string`                                                   |    No    | `"Coffee buff. Web enthusiast. Unapologetic student. Gamer. Avid organizer."`| Sets description(subtitle) section                       |
| `title`               | `string`                                                   |    No    | `"Brandon`                                                                   | Sets header title                                        |
| `transparentHeader`   | `boolean`                                                  |    No    | `false`                                                                      | Set header transparency to render custom header          |
