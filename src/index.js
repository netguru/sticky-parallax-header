import React, { Component } from 'react'
import { func, number, node, arrayOf, string, bool, shape } from 'prop-types'
import { Animated, ScrollView, View, ImageBackground, Dimensions, Platform } from 'react-native'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'
import { ScrollableTabBar } from './components'
import styles from './styles'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

class StickyParalaxHeader extends Component {
  constructor(props) {
    super(props)
    const { initialPage } = this.props
    const { width } = Dimensions.get('window')
    const scrollXIOS = new Animated.Value(initialPage * width)
    const containerWidthAnimatedValue = new Animated.Value(width)

    // eslint-disable-next-line no-underscore-dangle
    containerWidthAnimatedValue.__makeNative()
    const scrollValue = Animated.divide(scrollXIOS, containerWidthAnimatedValue)
    this.state = {
      scrollY: new Animated.Value(0),
      scrollHeight: 65,
      scrollValue,
      scrollXIOS,
      containerWidth: width,
      currentPage: initialPage,
      headerLayout: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    }
  }

  componentDidMount() {
    const { scrollY } = this.state
    // eslint-disable-next-line
    scrollY.addListener(({ value }) => (this._value = value))
  }

  componentWillUnmount() {
    const { scrollY } = this.state
    scrollY.removeListener()
  }

  onScrollEndSnapToEdge = (event) => {
    const { headerHeight, parallaxHeight, snapToEdge } = this.props
    const { scrollY } = this.state
    const { y } = event.nativeEvent.contentOffset
    const backgroundHeight = Math.max(parallaxHeight, headerHeight * 2)
    console.log('backgroundHeight: ', backgroundHeight)
    console.log('scrollY: ', scrollY)
    console.log('y : ', y)
    const scrollHeight = backgroundHeight
    if (snapToEdge) {
      if (y > 0 && y < scrollHeight / 2) {
        this.scroll.getNode().scrollTo({ x: 0, y: 0, animate: true })
      } else if (y >= scrollHeight / 2 && y < scrollHeight) {
        this.scroll.getNode().scrollTo({ x: 0, y: scrollHeight, animate: true })
      }
    }
  }

  onChangeTabHandler = (tab) => {
    const { onChangeTab, headerHeight } = this.props
    const { scrollY } = this.state
    onChangeTab ? onChangeTab(tab) : null
    if (scrollY._value > 0) {
      this.scroll.getNode().scrollTo({ x: 0, y: headerHeight - 41, animate: true })
    }
  }

  onScroll = (e) => {
    const { scrollEvent } = this.props
    scrollEvent && scrollEvent(e)
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
    this.setState({ headerLayout })
    headerSize(headerLayout)
  }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    const { onEndReached } = this.props

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      onEndReached()
    }
  }

  goToPage = (pageNumber) => {
    const { containerWidth } = this.state
    const offset = pageNumber * containerWidth
    if (this.scrollView) {
      this.scrollView.getNode().scrollTo({ x: offset, y: 0, animated: true })
    }
    this.setState({ currentPage: pageNumber })
  }

  renderHeader = () => {
    const { header, headerHeight } = this.props

    return (
      <View
        style={
          (styles.toolbarWrapper,
          {
            height: Platform.OS === 'android' ? headerHeight - 30 : headerHeight,
            paddingTop: Platform.OS === 'android' ? 0 : getStatusBarHeight('safe'),
            backgroundColor: header.props.style.backgroundColor
          })
        }
      >
        {header}
      </View>
    )
  }

  renderImageBackground = () => {
    const { headerHeight, parallaxHeight, backgroundImage } = this.props
    const backgroundHeight = Math.max(parallaxHeight, headerHeight * 2)
    const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

    return (
      <AnimatedImageBackground
        style={[
          styles.headerStyle,
          {
            height: backgroundHeight
          }
        ]}
        source={backgroundImage}
      />
    )
  }

  renderPlainBackground = () => {
    const { headerHeight, parallaxHeight, background } = this.props
    const backgroundHeight = Math.max(parallaxHeight, headerHeight * 2)

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

  renderForeground = () => {
    const { headerHeight, foreground, parallaxHeight, tabsContainerBackgroundColor } = this.props
    const backgroundHeight = Math.max(parallaxHeight, headerHeight * 2)

    return (
      <View
        style={{
          height: backgroundHeight,
          backgroundColor: tabsContainerBackgroundColor
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
      tabsContainerBackgroundColor
    } = this.props
    const { scrollValue, currentPage, containerWidth } = this.state

    const props = {
      goToPage: this.goToPage,
      tabs,
      scrollValue,
      activeTab: currentPage,
      containerWidth,
      tabTextStyle,
      tabTextActiveStyle,
      tabTextContainerStyle,
      tabTextContainerActiveStyle,
      tabsContainerBackgroundColor
    }

    return <ScrollableTabBar {...props} />
  }

  render() {
    const { header, children, backgroundImage, parallaxHeight, tabs } = this.props
    const { scrollY } = this.state

    const shouldRenderTabs = tabs && tabs.length > 0

    const translateParallax = scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    return (
      <View style={styles.container}>
        {header && this.renderHeader()}
        <AnimatedScrollView
          bounces={false}
          ref={(c) => {
            this.scroll = c
          }}
          style={styles.scrollView}
          onScrollEndDrag={event => this.onScrollEndSnapToEdge(event)}
          scrollEventThrottle={1}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
            listener: (event) => {
              this.isCloseToBottom(event.nativeEvent)
              this.onScroll(event)
            }
          })}
        >
          <Animated.View
            style={{
              height: parallaxHeight,
              transform: [{ translateY: translateParallax }]
            }}
            onLayout={e => this.onLayout(e)}
          >
            {backgroundImage ? this.renderImageBackground() : this.renderPlainBackground()}
            {this.renderForeground()}
          </Animated.View>
          {shouldRenderTabs && this.renderTabs()}
          <View>{children}</View>
        </AnimatedScrollView>
      </View>
    )
  }
}

StickyParalaxHeader.propTypes = {
  onEndReached: func,
  initialPage: number,
  locked: bool,
  foreground: node,
  header: node,
  headerHeight: number,
  parallaxHeight: number,
  children: node,
  onChangeTab: func,
  tabs: arrayOf(string),
  backgroundImage: number,
  background: node,
  scrollEvent: func,
  tabTextStyle: shape({}),
  tabTextActiveStyle: shape({}),
  tabTextContainerStyle: shape({}),
  tabTextContainerActiveStyle: shape({}),
  tabsContainerBackgroundColor: string,
  headerSize: func,
  snapToEdge: bool
}

StickyParalaxHeader.defaultProps = {
  headerHeight: 92,
  parallaxHeight: 0,
  initialPage: 0,
  tabTextStyle: {},
  tabTextActiveStyle: {},
  tabTextContainerStyle: {},
  tabTextContainerActiveStyle: {},
  snapToEdge: true
}

export default StickyParalaxHeader
