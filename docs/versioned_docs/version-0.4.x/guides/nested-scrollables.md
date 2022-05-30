---
sidebar_position: 2
---
# Handling nested scrollables

In order to nest scrollable component use `scrollEnabled={false}` on it and move all the logic to the header eg. by using `onEndReached` and `onTopReached` props. You can find example in CardScreen.tsx it's really basic so probably you will want to extend it somehow:

```jsx
shouldBeEnabled = () => {
  const { endReached, stickyHeaderEndReached, topReached, stickyHeaderTopReached } = this.state;
  const bottomCondition = endReached && stickyHeaderEndReached;
  const topCondition = topReached && stickyHeaderTopReached;
  return bottomCondition || !topCondition;
};
onScroll = ({ nativeEvent }) => {
  const { contentOffset, layoutMeasurement, contentSize } = nativeEvent;
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
    this.setState({ endReached: true, topReached: false });
  }
  if (contentOffset.y <= 0) {
    this.setState({ topReached: true, endReached: false, stickyHeaderTopReached: true });
  }
};
renderFlatlistContent = (user) => (
  <View style={styles.flatlistContainer}>
    <FlatList
      data={user.cards}
      renderItem={({ item, index }) => (
        <QuizCard data={item} num={index} key={item.question} cardsAmount={100} />
      )}
      onScroll={this.onScroll}
      scrollEnabled={Platform.OS === 'android' ? true : this.shouldBeEnabled()}
      nestedScrollEnabled
    />
  </View>
);
```
