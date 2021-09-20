import React, { ReactElement } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import SceneComponent from './SceneComponent';
import constants from '../../constants/constants';
import { getSafelyScrollNode } from '../../utils';
import type { MountedTabType } from 'react-native-sticky-parallax-header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type ReactChildMapType = React.ReactNode;

const { deviceWidth } = constants;

type ScrollableTabViewProps = {
  children: React.ReactNode;
  contentContainerStyles: StyleProp<ViewStyle>;
  initialPage: number;
  page: number;
  onChangeTab: (p: MountedTabType) => void;
  swipedPage: (index: number) => void;
  minScrollHeight: number;
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
  horizontalScrollBounces?: boolean;
  scrollEnabled: boolean;
  onScrollXIOS?: (x: number) => void;
};
type SceneKeys = string[];
type State = {
  currentPage: number;
  scrollXIOS: Animated.Value;
  containerWidth: number;
  sceneKeys: SceneKeys;
};

class ScrollableTabView extends React.Component<ScrollableTabViewProps, State> {
  scrollOnMountCalled: boolean = false;

  scrollView: ScrollView | null = null;

  constructor(props: ScrollableTabViewProps) {
    super(props);
    const { initialPage } = this.props;

    const scrollXIOS = new Animated.Value(initialPage * deviceWidth);
    const containerWidthAnimatedValue = new Animated.Value(deviceWidth);

    const scrollValue = new Animated.Value((initialPage * deviceWidth) / deviceWidth);

    // @ts-ignore
    containerWidthAnimatedValue.__makeNative();
    scrollValue.setValue(400);
    const callListeners = this.polyfillAnimatedValue(scrollValue);

    this.state = {
      currentPage: initialPage,
      scrollXIOS,
      containerWidth: deviceWidth,
      sceneKeys: this.newSceneKeys({ currentPage: initialPage }),
    };

    scrollXIOS.addListener(({ value }) => {
      this.props.onScrollXIOS?.(value);
      callListeners(value / deviceWidth);
    });
  }

  componentDidUpdate(prevProps: Readonly<ScrollableTabViewProps>) {
    const { children, page } = this.props;
    const { currentPage } = this.state;

    if (children !== prevProps.children) this.updateSceneKeys({ page: currentPage, children });

    if (page !== currentPage && page >= 0) this.goToPage(page);
  }

  componentWillUnmount() {
    const { scrollXIOS } = this.state;

    scrollXIOS.removeAllListeners();
  }

  onMomentumScrollBeginAndEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
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

  onChangeTab(prevPage: number, currentPage: number) {
    const { onChangeTab } = this.props;

    onChangeTab({
      i: currentPage,
      ref: this.children()[currentPage],
      from: prevPage,
    });
  }

  updateSelectedPage = (nextPage: number) => {
    let localNextPage = nextPage;

    /**
     * @TODO Check that block of code
     */
    if (typeof localNextPage === 'object') {
      // @ts-ignore
      localNextPage = nextPage?.nativeEvent?.position ?? 0;
    }
    /**
     * End
     */

    this.updateSceneKeys({
      page: localNextPage,
    });
  };

  composeScenes = () =>
    this.children?.()?.map((child, idx) => {
      const key = this.makeSceneKey(child as ReactElement, idx);
      const { currentPage, containerWidth, sceneKeys } = this.state;
      const { contentContainerStyles, minScrollHeight } = this.props;
      const actualChild = child as ReactElement;

      return (
        <SceneComponent
          key={actualChild.key}
          shouldUpdated={this.shouldRenderSceneKey(idx, currentPage)}
          style={[
            // used to calculate current height of scroll
            {
              width: containerWidth,
              minHeight: minScrollHeight,
              maxHeight: idx === currentPage ? undefined : minScrollHeight,
            },
            contentContainerStyles,
          ]}>
          {this.keyExists(sceneKeys, key) ? child : null}
        </SceneComponent>
      );
    });

  makeSceneKey = (child: React.ReactElement, idx: number): string =>
    `${child.props.accessibilityLabel}_${idx}`;

  keyExists = (sceneKeys: string[], key: string) => sceneKeys.find((sceneKey) => key === sceneKey);

  shouldRenderSceneKey = (idx: number, currentPageKey: number) =>
    idx < currentPageKey + 1 && idx > currentPageKey - 1;

  polyfillAnimatedValue = (animatedValue: Animated.Value) => {
    const listeners = new Map<string, Animated.ValueListenerCallback>();
    const addListener: Animated.Value['addListener'] = (listener) => {
      const key = Date.now().toString(10);

      listeners.set(key, listener);

      return key;
    };

    const removeListener: Animated.Value['removeListener'] = (listener) => {
      listeners.delete(listener);
    };

    const removeAllListeners: Animated.Value['removeAllListeners'] = () => {
      listeners.clear();
    };

    animatedValue.addListener = addListener;
    animatedValue.removeListener = removeListener;
    animatedValue.removeAllListeners = removeAllListeners;

    return (value: any) => listeners.forEach((listener) => listener({ value }));
  };

  newSceneKeys = ({
    previousKeys = [] as SceneKeys,
    currentPage = 0,
    children = this.props.children,
  }): string[] => {
    const newKeys: string[] = [];

    if (children) {
      this.children(children).forEach((child, idx) => {
        const key = this.makeSceneKey(child as ReactElement, idx);

        if (this.keyExists(previousKeys, key) || this.shouldRenderSceneKey(idx, currentPage)) {
          newKeys.push(key);
        }
      });
    }

    return newKeys;
  };

  updateSceneKeys = ({
    page,
    children = this.props.children,
    callback = () => {},
  }: {
    children?: ReactChildMapType;
    page: number;
    callback?: () => void;
  }) => {
    const { sceneKeys } = this.state;
    const newKeys: SceneKeys = this.newSceneKeys({
      previousKeys: sceneKeys,
      currentPage: page,
      children,
    });

    this.setState({ currentPage: page, sceneKeys: newKeys }, callback);
  };

  goToPage = (pageNumber: number) => {
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

  onScroll: ScrollViewProps['onScroll'] = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;

    if (offsetX === 0 && !this.scrollOnMountCalled) {
      this.scrollOnMountCalled = true;
    }
  };

  handleLayout = (e: LayoutChangeEvent) => {
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

  children = (children = this.props.children) => {
    return React.Children.map(children, (child: ReactChildMapType) => child) ?? [];
  };

  renderScrollableContent() {
    const scenes = this.composeScenes();
    const { initialPage, scrollEnabled, horizontalScrollBounces } = this.props;
    const { containerWidth, scrollXIOS } = this.state;
    const { minScrollHeight, keyboardShouldPersistTaps } = this.props;

    return (
      <Animated.ScrollView
        bounces={horizontalScrollBounces}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        horizontal
        pagingEnabled
        contentContainerStyle={{ minHeight: minScrollHeight }}
        automaticallyAdjustContentInsets={false}
        contentOffset={{ x: initialPage * containerWidth }}
        ref={(scrollView) => {
          this.scrollView = getSafelyScrollNode(scrollView);
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

  static defaultProps = {
    contentContainerStyles: {},
    initialPage: 0,
    page: -1,
    onChangeTab: () => {},
    keyboardShouldPersistTaps: undefined,
    children: [],
  };
}

export default ScrollableTabView;
