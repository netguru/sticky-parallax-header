import React, { Component, MutableRefObject, ReactNode } from 'react';
import {
  Dimensions,
  ScrollView,
  View,
  Animated,
  Easing,
  ScrollViewProps,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleProp,
} from 'react-native';
import { ScrollableTabBar, ScrollableTabView, HeaderBackgroundImage } from './components';
import { colors, constants } from './constants';
import styles from './styles';
import { getSafelyScrollNode, setRef } from './utils';
import type { Tab } from './index';
import type { ScrollableTabBarProps } from './components/ScrollableTabBar/ScrollableTabBar';
import type { MountedTabType } from './index';

const { Value, createAnimatedComponent, event, timing, ValueXY } = Animated;
const AnimatedScrollView = createAnimatedComponent(ScrollView);

export type DetailsData = {
  cardsAmount: number;
  author: string;
  type: string;
  label: string;
  color: string;
  labelColor: string;
  image: ImageSourcePropType;
  about: string;
};

export interface StickyParallaxHeaderProps {
  headerType?: undefined | 'Default';
  background?: ReactNode;
  backgroundColor: string;
  backgroundImage?: ImageSourcePropType;
  bounces?: boolean;
  children?: ReactNode;
  contentContainerStyles: StyleProp<ViewStyle>;
  foreground: ReactNode;
  header: React.ReactElement<{ style?: ViewStyle }>;
  headerHeight: number;
  headerSize?: (h: LayoutRectangle) => void;
  initialPage: number;
  onChangeTab?: (tab: MountedTabType) => void;
  onEndReached?: () => void;
  parallaxHeight: number;
  rememberTabScrollPosition: boolean;
  scrollEvent?: ScrollViewProps['onScroll'];
  snapToEdge?: boolean;
  tabTextActiveStyle: StyleProp<TextStyle>;
  tabTextContainerActiveStyle: StyleProp<ViewStyle>;
  tabTextContainerStyle: StyleProp<ViewStyle>;
  tabTextStyle: StyleProp<TextStyle>;
  tabs?: Tab[];
  tabsContainerBackgroundColor?: string;
  tabWrapperStyle?: StyleProp<ViewStyle>;
  tabsContainerStyle?: StyleProp<ViewStyle>;
  snapStartThreshold?: number;
  snapStopThreshold?: number;
  snapValue?: number;
  transparentHeader?: boolean;
  onRef: (t: StickyParallaxHeaderComponent | null) => void;
  onTopReached?: () => void;
  scrollRef: (t: ScrollView) => void | MutableRefObject<ScrollView>;
  keyboardShouldPersistTaps: ScrollViewProps['keyboardShouldPersistTaps'];
  refreshControl: ScrollViewProps['refreshControl'];
  onMomentumScrollEnd: ScrollViewProps['onMomentumScrollEnd'];
  onMomentumScrollBegin: ScrollViewProps['onMomentumScrollBegin'];
  decelerationRate: 'fast' | 'normal';
  tabUnderlineColor: string | null;
  tabsContainerHorizontalPadding?: number;
  horizontalScrollBounces?: boolean;
  horizontalSwipe?: boolean;
}

type State = {
  containerWidth: number;
  currentPage: number;
  isFolded: boolean;
};

type XYValue = { x: number; y: number };

class StickyParallaxHeaderComponent extends Component<StickyParallaxHeaderProps, State> {
  tabsScrollPosition: number[];

  scrollY: Animated.ValueXY;

  scrollXIOS: Animated.Value;

  _value: XYValue | null;

  scroll: ScrollView | null;

  scrollView: ScrollView | null;

  tab: View | null;

  constructor(props: StickyParallaxHeaderProps) {
    super(props);
    const { initialPage } = this.props;
    const { width } = Dimensions.get('window');

    this.scrollXIOS = new Value(initialPage * width);

    this.tabsScrollPosition = [];
    this._value = null;
    this.tab = null;

    this.state = {
      containerWidth: width,
      currentPage: initialPage,
      isFolded: false,
    };
    this.scrollY = new ValueXY();
    this.scroll = null;
    this.scrollView = null;
  }

  componentDidMount() {
    const { onRef } = this.props;

    this.scrollY.addListener((value) => (this._value = value));
    onRef?.(this);
  }

  componentDidUpdate(_prevProps: Readonly<StickyParallaxHeaderProps>, prevState: Readonly<State>) {
    const { headerHeight, parallaxHeight, tabs, rememberTabScrollPosition } = this.props;
    const prevPage = prevState.currentPage;
    const { currentPage, isFolded } = this.state;
    const isRenderingTabs = tabs && tabs.length > 0;

    if (isRenderingTabs && prevPage !== currentPage && isFolded) {
      // @ts-ignore
      const currentScrollPosition: number = this.scrollY.__getValue().y;
      const scrollHeight = Math.max(parallaxHeight, headerHeight * 2);

      this.tabsScrollPosition[prevPage] = currentScrollPosition;

      setTimeout(() => {
        const scrollTargetPosition =
          rememberTabScrollPosition && this.tabsScrollPosition[currentPage]
            ? this.tabsScrollPosition[currentPage]
            : scrollHeight;
        const scrollNode = getSafelyScrollNode(this.scroll);

        scrollNode?.scrollTo({ y: scrollTargetPosition });
      }, 250);
    }
  }

  componentWillUnmount() {
    // There is method as removeAllListeners, but no present in types: https://reactnative.dev/docs/animatedvaluexy#removealllisteners
    // @ts-ignore
    this.scrollY.removeAllListeners();
    this.props.onRef?.(null);
  }

  spring = () => {
    const scrollNode = getSafelyScrollNode(this.scroll);

    scrollNode?.scrollTo({ x: 0, y: 40, animated: true });

    return setTimeout(() => {
      setTimeout(() => {
        scrollNode?.scrollTo({ x: 0, y: 25, animated: true });
      }, 200);
      scrollNode?.scrollTo({ x: 0, y: 0, animated: true });
    }, 300);
  };

  onScrollEndSnapToEdge = (height: number) => {
    const { snapStartThreshold, snapStopThreshold, snapValue } = this.props;
    const scrollHeight = snapStopThreshold || height;
    const snap = snapValue || height;
    const { snapToEdge, refreshControl } = this.props;

    const scrollNode = getSafelyScrollNode(this.scroll);
    // @ts-ignore
    const scrollValue = this.scrollY.__getValue();

    const { y } = scrollValue;
    const snapToEdgeAnimatedValue = new ValueXY(scrollValue);
    const snapToEdgeThreshold = snapStartThreshold || height / 2;
    const id = snapToEdgeAnimatedValue.addListener((value) => {
      scrollNode?.scrollTo({ x: 0, y: value.y, animated: false });
    });

    if (y < -20 && !constants.isAndroid && !refreshControl) this.spring();

    if (snapToEdge) {
      if (y > 0 && y < snapToEdgeThreshold) {
        return constants.isAndroid
          ? this.setState(
              {
                isFolded: false,
              },
              () => scrollNode?.scrollTo({ x: 0, y: 0, animated: true })
            )
          : timing(snapToEdgeAnimatedValue, {
              toValue: { x: 0, y: 0 },
              duration: 400,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }).start(() => {
              snapToEdgeAnimatedValue.removeListener(id);
              this.setState({
                isFolded: false,
              });
            });
      }
      if (y >= snapToEdgeThreshold && y < scrollHeight) {
        return constants.isAndroid
          ? this.setState(
              {
                isFolded: true,
              },
              () => scrollNode?.scrollTo({ x: 0, y: scrollHeight, animated: true })
            )
          : timing(snapToEdgeAnimatedValue, {
              toValue: { x: 0, y: snap },
              duration: 400,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }).start(() => {
              snapToEdgeAnimatedValue.removeListener(id);
              this.setState({
                isFolded: true,
              });
            });
      }
    }

    return null;
  };

  onChangeTabHandler = (tab: MountedTabType) => {
    const { onChangeTab } = this.props;

    return onChangeTab && onChangeTab(tab);
  };

  onLayout = (e: LayoutChangeEvent) => {
    const { x, y, width, height } = e.nativeEvent.layout;
    const { headerSize } = this.props;
    const headerLayout = {
      x,
      y,
      width,
      height,
    };

    headerSize?.(headerLayout);
  };

  goToPage = (pageNumber: number) => {
    const { containerWidth, currentPage } = this.state;
    const offset = pageNumber * containerWidth;

    if (currentPage !== pageNumber) {
      this.setState({
        currentPage: pageNumber,
      });
    }
    if (this.scrollView) {
      this.scrollView.scrollTo({
        x: offset,
        y: 0,
        animated: true,
      });
    }
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
    const { onEndReached } = this.props;

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      return onEndReached && onEndReached();
    }

    return null;
  };

  isCloseToTop = ({ contentOffset }: NativeScrollEvent) => {
    const { onTopReached } = this.props;

    if (contentOffset.y <= 0) {
      return onTopReached && onTopReached();
    }

    return null;
  };

  renderHeader = () => {
    const { header, headerHeight, backgroundColor, transparentHeader } = this.props;

    const headerStyle = header?.props?.style ?? {};
    const isArray = Array.isArray(headerStyle);
    const arrayHeaderStyle: ViewStyle = {};

    if (isArray) {
      headerStyle.map((el) => Object.assign(arrayHeaderStyle, el));
    }

    return (
      <View
        style={
          (styles.toolbarWrapper,
          {
            height: headerHeight,
            backgroundColor: isArray ? arrayHeaderStyle?.backgroundColor : backgroundColor,
            ...(transparentHeader && styles.transparentHeader),
          })
        }>
        {header}
      </View>
    );
  };

  renderPlainBackground = (backgroundHeight: number) => {
    const { background } = this.props;

    return (
      <View
        style={[
          styles.headerStyle,
          {
            height: backgroundHeight,
          },
        ]}>
        {background}
      </View>
    );
  };

  renderForeground = (backgroundHeight: number) => {
    const { foreground, tabsContainerBackgroundColor, backgroundImage } = this.props;

    return (
      <View
        style={{
          height: backgroundHeight,
          backgroundColor: tabsContainerBackgroundColor,
          ...(backgroundImage && styles.transparentBackground),
        }}>
        {foreground}
      </View>
    );
  };

  renderTabs = () => {
    const {
      tabs,
      tabTextStyle,
      tabTextActiveStyle,
      tabTextContainerStyle,
      tabTextContainerActiveStyle,
      tabsContainerBackgroundColor,
      tabWrapperStyle,
      tabsContainerStyle,
      tabUnderlineColor,
      tabsContainerHorizontalPadding,
    } = this.props;
    const { currentPage } = this.state;

    const props: ScrollableTabBarProps = {
      activeTab: currentPage,
      goToPage: this.goToPage,
      scrollValue: this.scrollXIOS,
      tabTextActiveStyle,
      tabTextContainerActiveStyle,
      tabTextContainerStyle,
      tabTextStyle,
      tabs: tabs ?? [],
      tabsContainerBackgroundColor,
      tabWrapperStyle,
      tabsContainerStyle,
      tabUnderlineColor,
      tabsContainerHorizontalPadding,
    };

    return <ScrollableTabBar {...props} />;
  };

  render() {
    const {
      background,
      backgroundImage,
      children,
      contentContainerStyles,
      header,
      headerHeight,
      initialPage,
      parallaxHeight,
      tabs,
      bounces,
      scrollEvent,
      keyboardShouldPersistTaps,
      scrollRef,
      refreshControl,
      decelerationRate,
      onMomentumScrollEnd,
      onMomentumScrollBegin,
      horizontalScrollBounces,
      horizontalSwipe
    } = this.props;
    const { currentPage } = this.state;
    const scrollHeight = Math.max(parallaxHeight, headerHeight * 2);
    const headerStyle = header?.props?.style ?? {};
    const isArray = Array.isArray(headerStyle);
    const arrayHeaderStyle: ViewStyle = {};

    if (isArray) {
      headerStyle.map((el) => Object.assign(arrayHeaderStyle, el));
    }

    const scrollViewMinHeight = Dimensions.get('window').height + parallaxHeight - headerHeight;
    const innerScrollHeight = Dimensions.get('window').height - headerHeight - parallaxHeight;

    const shouldRenderTabs = tabs && tabs.length > 0;

    const hasSingleTab = tabs?.length === 1 || false;
    const hasSingleElement = hasSingleTab || (!tabs && children !== undefined);

    return (
      <View style={styles.container}>
        {header && this.renderHeader()}
        <AnimatedScrollView
          bounces={bounces}
          overScrollMode="never"
          refreshControl={refreshControl}
          bouncesZoom
          decelerationRate={decelerationRate}
          nestedScrollEnabled
          ref={(c: ScrollView | Animated.LegacyRef<ScrollView> | null) => {
            this.scroll = getSafelyScrollNode(c) as ScrollView;
            setRef<ScrollView>(scrollRef, this.scroll);
          }}
          contentContainerStyle={{
            minHeight: scrollViewMinHeight,
          }}
          onScrollEndDrag={() => this.onScrollEndSnapToEdge(scrollHeight)}
          scrollEventThrottle={1}
          stickyHeaderIndices={shouldRenderTabs ? [1] : []}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScroll={event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.scrollY.y,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
              listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
                this.isCloseToBottom(e.nativeEvent);
                this.isCloseToTop(e.nativeEvent);
                scrollEvent?.(e);
              },
            }
          )}>
          <View style={{ height: parallaxHeight }} onLayout={(e) => this.onLayout(e)}>
            <View
              style={[
                styles.overScrollPadding,
                {
                  backgroundColor: isArray
                    ? arrayHeaderStyle.backgroundColor
                    : headerStyle?.backgroundColor,
                },
                { backgroundColor: headerStyle?.backgroundColor },
              ]}
            />
            {backgroundImage ? (
              <HeaderBackgroundImage
                backgroundHeight={scrollHeight}
                backgroundImage={backgroundImage}
                background={background}
              />
            ) : (
              this.renderPlainBackground(scrollHeight)
            )}
            {this.renderForeground(scrollHeight)}
          </View>
          {shouldRenderTabs && this.renderTabs()}
          <ScrollableTabView
            horizontalScrollBounces={horizontalScrollBounces}
            onScrollXIOS={(x) => this.scrollXIOS.setValue(x)}
            contentContainerStyles={contentContainerStyles}
            initialPage={initialPage}
            onChangeTab={(i) => this.onChangeTabHandler(i)}
            page={currentPage}
            swipedPage={this.goToPage}
            minScrollHeight={innerScrollHeight}
            scrollEnabled={!hasSingleElement}
            horizontalSwipe={horizontalSwipe}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
            {!tabs && children}
            {tabs &&
              tabs.map((item) => (
                <View
                  accessibilityLabel={item.title}
                  key={item.title}
                  ref={(c) => {
                    this.tab = c;
                  }}>
                  {item.content}
                </View>
              ))}
          </ScrollableTabView>
        </AnimatedScrollView>
      </View>
    );
  }

  static defaultProps = {
    bounces: true,
    contentContainerStyles: {},
    headerHeight: 92,
    backgroundColor: '',
    initialPage: 0,
    parallaxHeight: 0,
    snapToEdge: true,
    tabTextActiveStyle: {},
    tabTextContainerActiveStyle: {},
    tabTextContainerStyle: {},
    tabTextStyle: {},
    tabWrapperStyle: {},
    rememberTabScrollPosition: false,
    snapStartThreshold: false,
    snapStopThreshold: false,
    snapValue: false,
    transparentHeader: false,
    onRef: null,
    scrollRef: null,
    keyboardShouldPersistTaps: undefined,
    refreshControl: undefined,
    decelerationRate: 'fast',
    onMomentumScrollEnd: undefined,
    onMomentumScrollBegin: undefined,
    tabUnderlineColor: colors.white,
    horizontalSwipe: true
  };
}

export default StickyParallaxHeaderComponent;
