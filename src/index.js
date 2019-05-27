import React, { Component } from 'react'
import { func, number, node, arrayOf, string, bool, shape } from 'prop-types'
import { Animated, ScrollView, View, ImageBackground, StatusBar, Dimensions } from 'react-native'
import styles from './styles'
import { ScrollableTabBar } from './components'

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
      nScroll: new Animated.Value(0),
      scrollHeight: 65,
      scrollValue,
      scrollXIOS,
      containerWidth: width,
      currentPage: initialPage,
      tabsHeight: 0,
      headerLayout: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
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
    const { headerHeight, parallaxHeight, snapToEdge } = this.props

    const { y } = event.nativeEvent.contentOffset
    const backgroundHeight = Math.max(parallaxHeight, headerHeight * 2)
    const scrollHeight = backgroundHeight + 35
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
    const { nScroll } = this.state
    onChangeTab ? onChangeTab(tab) : null
    if (nScroll._value > 0) {
      this.scroll.getNode().scrollTo({ x: 0, y: headerHeight - 41, animate: true })
    }
  }

  onScroll = (e) => {
    const { scrollEvent } = this.props
    const { y } = e.nativeEvent.contentOffset
    scrollEvent && scrollEvent(e)
    this.setState({
      top: y
    })
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

  renderTabs = () => {
    const {
      tabs,
      tabTextStyle,
      tabTextActiveStyle,
      tabTextContainerStyle,
      tabTextContainerActiveStyle,
      tabsContainerBackgroundColor
    } = this.props
    const shouldRenderTabs = tabs && tabs.length > 0
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

    return shouldRenderTabs ? (
      <View onLayout={e => this.setState({ tabsHeight: e.nativeEvent.layout.height })}>
        <ScrollableTabBar {...props} />
      </View>
    ) : null
  }

  renderHeader = () => {
    const { headerHeight, header, tabs, parallaxHeight } = this.props
    const { top, tabsHeight } = this.state
    const backgroundHeight = Math.max(parallaxHeight, headerHeight * 2)
    const scrollHeight = backgroundHeight + 35
    const shouldRenderTabs = tabs && tabs.length > 0 && top >= scrollHeight - tabsHeight + 45

    return (
      <View
        style={[styles.toolbarWrapper]}
        onLayout={e => this.setState({
          headerHeight: e.nativeEvent.layout.height
        })
        }
      >
        <View style={styles.titleWrapper}>
          {header}
          {shouldRenderTabs && this.renderTabs(true)}
        </View>
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
            height
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
      <React.Fragment>
        <View
          style={{
            height: backgroundHeight,
            paddingTop: headerHeight,
            backgroundColor: tabsContainerBackgroundColor
          }}
        >
          {foreground}
        </View>
        {this.renderTabs(false)}
      </React.Fragment>
    )
  }

  render() {
    const { header, children, backgroundImage, parallaxHeight } = this.props
    const { nScroll, tabsHeight } = this.state

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
            // useNativeDriver: true,
            listener: (event) => {
              this.isCloseToBottom(event.nativeEvent)
              this.onScroll(event)
            }
          })}
        >
          <Animated.View
            style={{
              transform: [{ translateY: Animated.multiply(nScroll, 0.3) }],
              height: parallaxHeight + tabsHeight
            }}
            onLayout={e => this.onLayout(e)}
          >
            {backgroundImage ? this.renderImageBackground() : this.renderPlainBackground()}
            {this.renderForeground()}
          </Animated.View>
          <Animated.View
            style={{
              paddingTop: Animated.multiply(nScroll, 0.3)
            }}
          >
            {children}
          </Animated.View>
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
  tabTextStyle: shape({}),
  tabTextActiveStyle: shape({}),
  tabTextContainerStyle: shape({}),
  tabTextContainerActiveStyle: shape({}),
  tabsContainerBackgroundColor: string,
  headerSize: func,
  snapToEdge: bool
}

StickyParalaxHeader.defaultProps = {
  headerHeight: 70,
  parallaxHeight: 0,
  initialPage: 0,
  tabTextStyle: {},
  tabTextActiveStyle: {},
  tabTextContainerStyle: {},
  tabTextContainerActiveStyle: {},
  snapToEdge: true
}

export default StickyParalaxHeader
