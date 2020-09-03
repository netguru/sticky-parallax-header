import React, { Component } from 'react'
import {
  arrayOf,
  bool,
  func,
  node,
  number,
  shape,
  string,
  oneOfType
} from 'prop-types'
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  View,
  Animated,
  Easing,
  ViewPropTypes,
  Image
} from 'react-native'
import { ScrollableTabBar, ScrollableTabView } from './components'
import { constants } from './constants'
import styles from './styles'
import { getSafelyScrollNode } from './utils'

const { divide, Value, createAnimatedComponent, event, timing, ValueXY } = Animated
const AnimatedScrollView = createAnimatedComponent(ScrollView)

class StickyParallaxHeader extends Component {
  constructor(props) {
    super(props)
    const { initialPage } = this.props
    const { width } = Dimensions.get('window')
    const scrollXIOS = new Value(initialPage * width)
    const containerWidthAnimatedValue = new Value(width)
    this.tabsScrollPosition = []

    // eslint-disable-next-line no-underscore-dangle
    containerWidthAnimatedValue.__makeNative()
    const scrollValue = divide(scrollXIOS, containerWidthAnimatedValue)
    this.state = {
      scrollValue,
      containerWidth: width,
      currentPage: initialPage,
      isFolded: false
    }
    this.scrollY = new ValueXY()
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.scrollY.addListener(({ value }) => (this._value = value))
    this.props.onRef?.(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { headerHeight, parallaxHeight, tabs, rememberTabScrollPosition } = this.props
    const prevPage = prevState.currentPage
    const { currentPage, isFolded } = this.state
    const isRenderingTabs = tabs && tabs.length > 0

    if (isRenderingTabs && prevPage !== currentPage && isFolded) {
      const currentScrollPosition = this.scrollY.__getValue().y
      const scrollHeight = Math.max(parallaxHeight, headerHeight * 2)

      this.tabsScrollPosition[prevPage] = currentScrollPosition

      setTimeout(() => {
        const scrollTargetPosition =
          rememberTabScrollPosition && this.tabsScrollPosition[currentPage]
            ? this.tabsScrollPosition[currentPage]
            : scrollHeight
        const scrollNode = getSafelyScrollNode(this.scroll)
        scrollNode.scrollTo({ y: scrollTargetPosition, duration: 1000 })
      }, 250)
    }
  }

  componentWillUnmount() {
    this.scrollY.removeAllListeners()
    this.props.onRef?.(null)
  }

  spring = () => {
    const scrollNode = getSafelyScrollNode(this.scroll)
    scrollNode.scrollTo({ x: 0, y: 40, animated: true })

    return setTimeout(() => {
      setTimeout(() => {
        scrollNode.scrollTo({ x: 0, y: 25, animated: true })
      }, 200)
      scrollNode.scrollTo({ x: 0, y: 0, animated: true })
    }, 300)
  }

  onScrollEndSnapToEdge = (height) => {
    const { snapStartThreshold, snapStopThreshold, snapValue } = this.props
    const scrollHeight = snapStopThreshold || height
    const snap = snapValue || height
    const { snapToEdge } = this.props

    const scrollNode = getSafelyScrollNode(this.scroll)
    // eslint-disable-next-line no-underscore-dangle
    const scrollValue = this.scrollY.__getValue()
    const { y } = scrollValue
    const snapToEdgeAnimatedValue = new ValueXY(scrollValue)
    const snapToEdgeThreshold = snapStartThreshold || height / 2
    const id = snapToEdgeAnimatedValue.addListener((value) => {
      scrollNode.scrollTo({ x: 0, y: value.y, animated: false })
    })

    if (y < -20 && !constants.isAndroid) this.spring(y)

    if (snapToEdge) {
      if (y > 0 && y < snapToEdgeThreshold) {
        return constants.isAndroid
          ? this.setState(
            {
              isFolded: false
            },
            scrollNode.scrollTo({ x: 0, y: 0, animated: true })
          )
          : timing(snapToEdgeAnimatedValue, {
            toValue: { x: 0, y: 0 },
            duration: 400,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true
          }).start(() => {
            snapToEdgeAnimatedValue.removeListener(id)
            this.setState({
              isFolded: false
            })
          })
      }
      if (y >= snapToEdgeThreshold && y < scrollHeight) {
        return constants.isAndroid
          ? this.setState(
            {
              isFolded: true
            },
            scrollNode.scrollTo({ x: 0, y: scrollHeight, animated: true })
          )
          : timing(snapToEdgeAnimatedValue, {
            toValue: { x: 0, y: snap },
            duration: 400,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true
          }).start(() => {
            snapToEdgeAnimatedValue.removeListener(id)
            this.setState({
              isFolded: true
            })
          })
      }
    }

    return null
  }

  onChangeTabHandler = (tab) => {
    const { onChangeTab } = this.props

    return onChangeTab && onChangeTab(tab)
  }

  onLayout = (e) => {
    const { x, y, width, height } = e.nativeEvent.layout
    const { headerSize } = this.props
    const headerLayout = {
      x,
      y,
      width,
      height
    }
    headerSize(headerLayout)
  }

  goToPage = (pageNumber) => {
    const { containerWidth, currentPage } = this.state
    const offset = pageNumber * containerWidth
    if (currentPage !== pageNumber) {
      this.setState({
        currentPage: pageNumber
      })
    }
    if (this.scrollView) {
      this.scrollView.scrollTo({
        x: offset,
        y: 0,
        animated: true
      })
    }
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const { onEndReached } = this.props

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      return onEndReached && onEndReached()
    }

    return null
  }

  isCloseToTop = ({ contentOffset }) => {
    const { onTopReached } = this.props
    if (contentOffset.y <= 0) {
      return onTopReached && onTopReached()
    }

    return null
  }

  renderHeader = () => {
    const { header, headerHeight, backgroundColor, transparentHeader } = this.props

    const headerStyle = header.props.style
    const isArray = Array.isArray(headerStyle)
    const arrayHeaderStyle = {}
    if (isArray) {
      headerStyle.map((el) => Object.assign(arrayHeaderStyle, el))
    }

    return (
      <View
        style={
          (styles.toolbarWrapper,
          {
            height: headerHeight,
            backgroundColor: isArray
              ? arrayHeaderStyle.backgroundColor
              : backgroundColor || headerStyle?.backgroundColor,
            ...(transparentHeader && styles.transparentHeader)
          })
        }
      >
        {header}
      </View>
    )
  }

  renderImageBackground = (backgroundHeight) => {
    const { backgroundImage, background } = this.props

    const AnimatedImageBackground = createAnimatedComponent(ImageBackground)

    return (
      <AnimatedImageBackground
        style={[
          styles.headerStyle,
          {
            height: backgroundHeight
          }
        ]}
        source={backgroundImage}
      >
        {background}
      </AnimatedImageBackground>
    )
  }

  renderPlainBackground = (backgroundHeight) => {
    const { background } = this.props

    return (
      <View
        style={[
          styles.headerStyle,
          {
            height: backgroundHeight
          }
        ]}
      >
        {background}
      </View>
    )
  }

  renderForeground = (backgroundHeight) => {
    const { foreground, tabsContainerBackgroundColor, backgroundImage } = this.props

    return (
      <View
        style={{
          height: backgroundHeight,
          backgroundColor: tabsContainerBackgroundColor,
          ...(backgroundImage && styles.transparentBackground)
        }}
      >
        {foreground}
      </View>
    )
  }

  renderTabs = () => {
    const {
      tabs,
      tabTextStyle,
      tabTextActiveStyle,
      tabTextContainerStyle,
      tabTextContainerActiveStyle,
      tabsContainerBackgroundColor,
      tabWrapperStyle,
      tabsContainerStyle
    } = this.props
    const { scrollValue, currentPage, containerWidth } = this.state

    const props = {
      activeTab: currentPage,
      containerWidth,
      goToPage: this.goToPage,
      scrollValue,
      tabTextActiveStyle,
      tabTextContainerActiveStyle,
      tabTextContainerStyle,
      tabTextStyle,
      tabsContainerBackgroundColor,
      tabs,
      tabWrapperStyle,
      tabsContainerStyle
    }

    return <ScrollableTabBar {...props} />
  }

  render() {
    const {
      backgroundImage,
      children,
      contentContainerStyles,
      header,
      headerHeight,
      initialPage,
      parallaxHeight,
      tabs,
      bounces,
      scrollEvent
    } = this.props
    const { currentPage, isFolded } = this.state
    const scrollHeight = Math.max(parallaxHeight, headerHeight * 2)
    const headerStyle = header.props.style
    const isArray = Array.isArray(headerStyle)
    const arrayHeaderStyle = {}
    if (isArray) {
      headerStyle.map((el) => Object.assign(arrayHeaderStyle, el))
    }

    const scrollViewMinHeight = Dimensions.get('window').height + parallaxHeight - headerHeight
    const innerScrollHeight = Dimensions.get('window').height - headerHeight - parallaxHeight

    const shouldRenderTabs = tabs && tabs.length > 0
    const shouldUseBgColor = contentContainerStyles && contentContainerStyles.backgroundColor

    return (
      <View style={styles.container}>
        {header && this.renderHeader()}
        <AnimatedScrollView
          bounces={bounces}
          overScrollMode="never"
          bouncesZoom
          decelerationRate="fast"
          nestedScrollEnabled
          ref={(c) => {
            this.scroll = c
          }}
          contentContainerStyle={{ minHeight: scrollViewMinHeight, backgroundColor: shouldUseBgColor }}
          onScrollEndDrag={() => this.onScrollEndSnapToEdge(scrollHeight)}
          scrollEventThrottle={1}
          stickyHeaderIndices={shouldRenderTabs ? [1] : []}
          showsVerticalScrollIndicator={false}
          onScroll={event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.scrollY.y
                  }
                }
              }
            ],
            {
              useNativeDriver: true,
              listener: (e) => {
                this.isCloseToBottom(e.nativeEvent)
                this.isCloseToTop(e.nativeEvent)
                scrollEvent(e)
              }
            }
          )}
        >
          <View style={{ height: parallaxHeight }} onLayout={(e) => this.onLayout(e)}>
            <View
              style={[
                styles.overScrollPadding,
                {
                  backgroundColor: isArray
                    ? arrayHeaderStyle.backgroundColor
                    : headerStyle?.backgroundColor
                }
              ]}
            />
            {backgroundImage
              ? this.renderImageBackground(scrollHeight)
              : this.renderPlainBackground(scrollHeight)}
            {this.renderForeground(scrollHeight)}
          </View>
          {shouldRenderTabs && this.renderTabs()}
          <ScrollableTabView
            contentContainerStyles={contentContainerStyles}
            initialPage={initialPage}
            onChangeTab={(i) => this.onChangeTabHandler(i)}
            tabs={tabs}
            page={currentPage}
            swipedPage={this.goToPage}
            scrollRef={this.scroll}
            scrollHeight={scrollHeight}
            isHeaderFolded={isFolded}
            minScrollHeight={innerScrollHeight}
          >
            {!tabs && children}
            {tabs &&
              tabs.map((item) => (
                <View
                  tabLabel={item.title}
                  key={item.title}
                  onLayout={this.setContentHeight}
                  ref={(c) => {
                    this.tab = c
                  }}
                >
                  {item.content}
                </View>
              ))}
          </ScrollableTabView>
        </AnimatedScrollView>
      </View>
    )
  }
}

StickyParallaxHeader.propTypes = {
  background: node,
  backgroundColor: string,
  backgroundImage: Image.propTypes.source,
  bounces: bool,
  children: node,
  contentContainerStyles: ViewPropTypes.style,
  foreground: node,
  header: node,
  headerHeight: number,
  headerSize: func.isRequired,
  initialPage: number,
  onChangeTab: func,
  onEndReached: func,
  parallaxHeight: number,
  rememberTabScrollPosition: bool,
  scrollEvent: func,
  snapToEdge: bool,
  tabTextActiveStyle: shape({}),
  tabTextContainerActiveStyle: shape({}),
  tabTextContainerStyle: shape({}),
  tabTextStyle: shape({}),
  tabs: arrayOf(shape({})),
  tabsContainerBackgroundColor: string,
  tabWrapperStyle: ViewPropTypes.style,
  tabsContainerStyle: ViewPropTypes.style,
  snapStartThreshold: oneOfType([bool, number]),
  snapStopThreshold: oneOfType([bool, number]),
  snapValue: oneOfType([bool, number]),
  transparentHeader: bool,
  onRef: func,
  onTopReached: func
}

StickyParallaxHeader.defaultProps = {
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
  onRef: null
}

export default StickyParallaxHeader
