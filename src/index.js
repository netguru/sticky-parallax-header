import React, { Component } from 'react'
import { func, number, node, arrayOf, string, bool } from 'prop-types'
import { Animated, ScrollView, View, ImageBackground } from 'react-native'
import styles from './styles'
import { ScrollableTabBar } from './components'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

class StickyParalaxHeader extends Component {
  constructor(props) {
    super(props)
    const { initialPage, deviceWidth } = this.props

    const scrollXIOS = new Animated.Value(initialPage * deviceWidth)
    const containerWidthAnimatedValue = new Animated.Value(deviceWidth)

    // eslint-disable-next-line no-underscore-dangle
    containerWidthAnimatedValue.__makeNative()
    const scrollValue = Animated.divide(scrollXIOS, containerWidthAnimatedValue)
    this.state = {
      nScroll: new Animated.Value(0),
      scrollHeight: 65,
      scrollValue,
      scrollXIOS,
      containerWidth: deviceWidth,
      currentPage: initialPage
    }
  }

  componentDidMount() {
    const { nScroll } = this.state
    // eslint-disable-next-line
    nScroll.addListener(({ value }) => (this._value = value))
  }

  componentWillUnmount() {
    const { nScroll } = this.state
    nScroll.removeListener()
  }

  onScrollEndSnapToEdge = (event) => {
    const { headerHeight, parallaxHeight } = this.props
    const { contentHeight } = this.state
    const { y } = event.nativeEvent.contentOffset
    const backgroundHeight = Math.max(parallaxHeight, headerHeight * 2)
    const scrollHeight = backgroundHeight + 35
    if (y > 0 && y < scrollHeight / 2) {
      this.scroll.getNode().scrollTo({ x: 0, y: 0, animate: true })
    } else if (y >= scrollHeight / 2 && y < scrollHeight) {
      this.scroll.getNode().scrollTo({ x: 0, y: scrollHeight, animate: true })
    } else if (contentHeight < 400 && y > headerHeight) {
      this.scroll.getNode().scrollTo({ x: 0, y: headerHeight - 41, animate: true })
    }
  }

  onChangeTabHandler = (tab) => {
    const { onChangeTab, headerHeight } = this.props
    const { nScroll } = this.state
    onChangeTab ? onChangeTab(tab) : null
    if (nScroll._value > 0) {
      this.scroll.getNode().scrollTo({ x: 0, y: headerHeight - 41, animate: true })
    }
  }

  onScroll = (e) => {
    const { scrollEvent } = this.props

    scrollEvent && scrollEvent(e)
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

  renderTabs = () => {
    const { tabs } = this.props
    const shouldRenderTabs = tabs && tabs.length > 0
    const { nScroll, scrollHeight, scrollValue, currentPage, containerWidth } = this.state

    const tabY = nScroll.interpolate({
      inputRange: [0, scrollHeight, scrollHeight + 1],
      outputRange: [0, 0, 1]
    })

    const tabOpacity = nScroll.interpolate({
      inputRange: [0, 65],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    const props = {
      goToPage: this.goToPage,
      tabs,
      scrollValue,
      activeTab: currentPage,
      containerWidth
    }

    return shouldRenderTabs ? (
      <Animated.View
        style={[
          styles.singleTabContainer,
          {
            transform: [{ translateY: tabY }],
            opacity: tabOpacity
          }
        ]}
      >
        <ScrollableTabBar {...props} />
      </Animated.View>
    ) : null
  }

  renderHeader = () => {

    const { headerHeight, header, tabs } = this.props
    const shouldRenderTabs = tabs && tabs.length > 0
    const { scrollValue, currentPage, containerWidth, nScroll } = this.state

    const props = {
      goToPage: this.goToPage,
      tabs,
      scrollValue,
      activeTab: currentPage,
      containerWidth
    }
    const tabOpacity = nScroll.interpolate({
      inputRange: [0, 65],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    return (
      <View style={[styles.toolbar, { height: headerHeight }]}>
        <Animated.View style={[styles.toolbarWrapper, { height: headerHeight }]}>
          <View style={styles.titleWrapper}>
            {header}
            <Animated.View
              style={[
                styles.singleTabContainer,
                {
                  opacity: tabOpacity
                }
              ]}
            >
              {shouldRenderTabs ? <ScrollableTabBar {...props} /> : null}
            </Animated.View>
          </View>
        </Animated.View>
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
    const { headerHeight, foreground, parallaxHeight } = this.props
    const backgroundHeight = Math.max(parallaxHeight, headerHeight * 2)

    return (
      <View style={{ height: backgroundHeight, paddingTop: headerHeight }}>
        {foreground}
        {this.renderTabs()}
      </View>
    )
  }

  render() {
    const { header, children, backgroundImage, parallaxHeight } = this.props
    const { nScroll } = this.state

    return (
      <View style={styles.container}>
        <AnimatedScrollView
          bounces={false}
          ref={(c) => {
            this.scroll = c
          }}
          onScrollEndDrag={event => this.onScrollEndSnapToEdge(event)}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: nScroll } } }], {
            useNativeDriver: true,
            listener: (event) => {
              this.isCloseToBottom(event.nativeEvent)
              this.onScroll(event)
            }
          })}
        >
          <Animated.View
            style={{
              transform: [{ translateY: Animated.multiply(nScroll, 0.1) }],
              height: parallaxHeight
            }}
          >
            {backgroundImage ? this.renderImageBackground() : this.renderPlainBackground()}
            {this.renderForeground()}
          </Animated.View>
          {children}
        </AnimatedScrollView>
        {header && this.renderHeader()}
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
  deviceWidth: number
}

StickyParalaxHeader.defaultProps = {
  headerHeight: 140,
  parallaxHeight: 0,
  initialPage: 0
}

export default StickyParalaxHeader
