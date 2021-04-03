/* eslint-disable react/destructuring-assignment  */
import React from 'react';
import { Animated, StyleSheet, View, ViewPropTypes } from 'react-native';
import { bool, func, node, number, oneOf } from 'prop-types';
import SceneComponent from './SceneComponent';
import constants from '../../constants/constants';
import { getSafelyScrollNode } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const { deviceWidth } = constants;

class ScrollableTabView extends React.Component {
  scrollOnMountCalled = false;

  constructor(props) {
    super(props);
    const { initialPage } = this.props;

    const scrollXIOS = new Animated.Value(initialPage * deviceWidth);
    const containerWidthAnimatedValue = new Animated.Value(deviceWidth);

    // eslint-disable-next-line no-underscore-dangle
    containerWidthAnimatedValue.__makeNative();
    const scrollValue = Animated.divide(scrollXIOS, containerWidthAnimatedValue);

    const callListeners = this.polyfillAnimatedValue(scrollValue);

    this.state = {
      currentPage: initialPage,
      scrollXIOS,
      containerWidth: deviceWidth,
      sceneKeys: this.newSceneKeys({ currentPage: initialPage }),
    };

    scrollXIOS.addListener(({ value }) => callListeners(value / deviceWidth));
  }

  componentDidUpdate(prevProps) {
    const { children, page } = this.props;
    const { currentPage } = this.state;

    if (children !== prevProps.children) this.updateSceneKeys({ page: currentPage, children });

    if (page !== currentPage && page >= 0) this.goToPage(page);
  }

  componentWillUnmount() {
    const { scrollXIOS } = this.state;

    scrollXIOS.removeAllListeners();
  }

  onMomentumScrollBeginAndEnd = (e) => {
    const { containerWidth, currentPage } = this.state;
    const { swipedPage } = this.props;
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / containerWidth);

    if (currentPage !== page) {
      swipedPage(page);
      this.onChangeTab(currentPage, page);
      this.updateSelectedPage(page);
    }
  };

  onChangeTab(prevPage, currentPage) {
    const { onChangeTab } = this.props;
    onChangeTab({
      i: currentPage,
      ref: this.children()[currentPage],
      from: prevPage,
    });
  }

  updateSelectedPage = (nextPage) => {
    let localNextPage = nextPage;
    if (typeof localNextPage === 'object') {
      localNextPage = nextPage.nativeEvent.position;
    }

    this.updateSceneKeys({
      page: localNextPage,
    });
  };

  composeScenes = () =>
    this.children().map((child, idx) => {
      const key = this.makeSceneKey(child, idx);
      const { currentPage, containerWidth, sceneKeys } = this.state;
      const { contentContainerStyles, minScrollHeight } = this.props;

      return (
        <SceneComponent
          key={child.key}
          shouldUpdated={this.shouldRenderSceneKey(idx, currentPage)}
          style={[
            // used to calculate current height of scroll
            // eslint-disable-next-line react-native/no-inline-styles
            {
              width: containerWidth,
              minHeight: minScrollHeight,
              maxHeight: idx === currentPage ? null : minScrollHeight,
            },
            contentContainerStyles,
          ]}>
          {this.keyExists(sceneKeys, key) ? child : null}
        </SceneComponent>
      );
    });

  makeSceneKey = (child, idx) => `${child.props.tabLabel}_${idx}`;

  keyExists = (sceneKeys, key) => sceneKeys.find((sceneKey) => key === sceneKey);

  // eslint-disable-next-line max-len
  shouldRenderSceneKey = (idx, currentPageKey) =>
    idx < currentPageKey + 1 && idx > currentPageKey - 1;

  polyfillAnimatedValue = (animatedValue) => {
    const listeners = new Set();
    const addListener = (listener) => {
      listeners.add(listener);
    };

    const removeListener = (listener) => {
      listeners.delete(listener);
    };

    const removeAllListeners = () => {
      listeners.clear();
    };

    /* eslint-disable no-param-reassign  */
    animatedValue.addListener = addListener;
    animatedValue.removeListener = removeListener;
    animatedValue.removeAllListeners = removeAllListeners;
    /* eslint-disable no-param-reassign  */

    return (value) => listeners.forEach((listener) => listener({ value }));
  };

  newSceneKeys = ({ previousKeys = [], currentPage = 0, children = this.props.children }) => {
    const newKeys = [];
    this.children(children).forEach((child, idx) => {
      const key = this.makeSceneKey(child, idx);
      if (this.keyExists(previousKeys, key) || this.shouldRenderSceneKey(idx, currentPage)) {
        newKeys.push(key);
      }
    });

    return newKeys;
  };

  updateSceneKeys = ({ page, children = this.props.children, callback = () => {} }) => {
    const { sceneKeys } = this.state;
    const newKeys = this.newSceneKeys({ previousKeys: sceneKeys, currentPage: page, children });
    this.setState({ currentPage: page, sceneKeys: newKeys }, callback);
  };

  goToPage = (pageNumber) => {
    const { containerWidth } = this.state;
    const offset = pageNumber * containerWidth;
    const scrollNode = getSafelyScrollNode(this.scrollView);
    if (scrollNode) {
      scrollNode.scrollTo({ x: offset, y: 0, animated: true });
    }

    const { currentPage } = this.state;
    this.updateSceneKeys({
      page: pageNumber,
      callback: this.onChangeTab.bind(this, currentPage, pageNumber),
    });
  };

  onScroll = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    if (offsetX === 0 && !this.scrollOnMountCalled) {
      this.scrollOnMountCalled = true;
    }
  };

  handleLayout = (e) => {
    const { width } = e.nativeEvent.layout;
    const { containerWidth, currentPage } = this.state;

    if (!width || width <= 0 || Math.round(width) === Math.round(containerWidth)) {
      return;
    }

    this.setState({ containerWidth: width });
    requestAnimationFrame(() => {
      this.goToPage(currentPage);
    });
  };

  children = (children = this.props.children) => React.Children.map(children, (child) => child);

  renderScrollableContent() {
    const scenes = this.composeScenes();
    const { initialPage, scrollEnabled } = this.props;
    const { containerWidth, scrollXIOS } = this.state;
    const { minScrollHeight, keyboardShouldPersistTaps } = this.props;

    return (
      <Animated.ScrollView
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        horizontal
        pagingEnabled
        contentContainerStyle={{ minHeight: minScrollHeight }}
        automaticallyAdjustContentInsets={false}
        contentOffset={{ x: initialPage * containerWidth }}
        ref={(scrollView) => {
          this.scrollView = scrollView;
        }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollXIOS } } }], {
          useNativeDriver: true,
          listener: this.onScroll,
        })}
        onMomentumScrollEnd={this.onMomentumScrollBeginAndEnd}
        scrollEventThrottle={16}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        directionalLockEnabled
        alwaysBounceVertical={false}
        keyboardDismissMode="on-drag">
        {scenes}
      </Animated.ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.container} onLayout={this.handleLayout}>
        {this.renderScrollableContent()}
      </View>
    );
  }
}

ScrollableTabView.propTypes = {
  children: node,
  contentContainerStyles: ViewPropTypes.style,
  initialPage: number,
  page: number,
  onChangeTab: func,
  swipedPage: func,
  minScrollHeight: number,
  keyboardShouldPersistTaps: oneOf(['never', 'always', 'handled', false, true, undefined]),
  scrollEnabled: bool.isRequired,
};

ScrollableTabView.defaultProps = {
  contentContainerStyles: {},
  initialPage: 0,
  page: -1,
  onChangeTab: () => {},
  keyboardShouldPersistTaps: undefined,
};

export default ScrollableTabView;
