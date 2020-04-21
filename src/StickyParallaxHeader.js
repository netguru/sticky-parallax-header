import React, { Component } from 'react'
import { arrayOf, bool, func, node, number, shape, string } from 'prop-types'
import { Dimensions, ImageBackground, ScrollView, View, Animated, Easing } from 'react-native'
import { ScrollableTabBar, ScrollableTabView } from './components'
import { constants } from './constants'
import styles from './styles'

const { divide, Value, createAnimatedComponent, event, timing, ValueXY } = Animated
const AnimatedScrollView = createAnimatedComponent(ScrollView)

class StickyParallaxHeader extends Component {
  constructor(props) {
    super(props)
    const { initialPage } = this.props
    const { width } = Dimensions.get('window')
    const scrollXIOS = new Value(initialPage * width)
    const containerWidthAnimatedValue = new Value(width)

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
  }

  componentWillUnmount() {
    this.scrollY.removeAllListeners()
  }

  spring = () => {
    const scrollNode = this.scroll
    scrollNode.scrollTo({ x: 0, y: 40, animated: true })

    return setTimeout(() => {
      setTimeout(() => {
        scrollNode.scrollTo({ x: 0, y: 25, animated: true })
      }, 200)
      scrollNode.scrollTo({ x: 0, y: 0, animated: true })
    }, 300)
  }

  onScrollEndSnapToEdge = (scrollHeight) => {
    const { snapToEdge } = this.props
    const scrollNode = this.scroll
    // eslint-disable-next-line no-underscore-dangle
    const scrollValue = this.scrollY.__getValue()
    const { y } = scrollValue
    const snapToEdgeAnimatedValue = new ValueXY(scrollValue)
    const snapToEdgeTreshold = scrollHeight / 2
    const id = snapToEdgeAnimatedValue.addListener((value) => {
      scrollNode.scrollTo({ x: 0, y: value.y, animated: false })
    })

    if (y < -20 && !constants.isAndroid) this.spring(y)

    if (snapToEdge) {
      if (y > 0 && y < snapToEdgeTreshold) {
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
      if (y >= snapToEdgeTreshold && y < scrollHeight) {
        return constants.isAndroid
          ? this.setState(
              {
                isFolded: true
              },
              scrollNode.scrollTo({ x: 0, y: scrollHeight, animated: true })
            )
          : timing(snapToEdgeAnimatedValue, {
              toValue: { x: 0, y: scrollHeight },
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

  renderHeader = () => {
    const { header, headerHeight, backgroundColor } = this.props

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
              : backgroundColor || headerStyle?.backgroundColor
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
    const { foreground, tabsContainerBackgroundColor } = this.props

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
      tabsContainerBackgroundColor,
      tabsWrapperStyle
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
      tabsWrapperStyle
    }

    return <ScrollableTabBar {...props} />
  }

  render() {
    const {
      backgroundImage,
      children,
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

    const shouldRenderTabs = tabs && tabs.length > 0

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
                  backgroundColor: isArray ? arrayHeaderStyle.backgroundColor : headerStyle?.backgroundColor
                }
              ]}
            />
            {backgroundImage ? this.renderImageBackground(scrollHeight) : this.renderPlainBackground(scrollHeight)}
            {this.renderForeground(scrollHeight)}
          </View>
          {shouldRenderTabs && this.renderTabs()}
          <ScrollableTabView
            initialPage={initialPage}
            onChangeTab={(i) => this.onChangeTabHandler(i)}
            tabs={tabs}
            page={currentPage}
            swipedPage={this.goToPage}
            scrollRef={this.scroll}
            scrollHeight={scrollHeight}
            isHeaderFolded={isFolded}
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
  backgroundImage: number,
  bounces: bool,
  children: node,
  foreground: node,
  header: node,
  headerHeight: number,
  headerSize: func.isRequired,
  initialPage: number,
  onChangeTab: func,
  onEndReached: func,
  parallaxHeight: number,
  scrollEvent: func,
  snapToEdge: bool,
  tabTextActiveStyle: shape({}),
  tabTextContainerActiveStyle: shape({}),
  tabTextContainerStyle: shape({}),
  tabTextStyle: shape({}),
  tabs: arrayOf(shape({})),
  tabsContainerBackgroundColor: string,
  tabsWrapperStyle: shape({})
}

StickyParallaxHeader.defaultProps = {
  bounces: true,
  headerHeight: 92,
  backgroundColor: '',
  initialPage: 0,
  parallaxHeight: 0,
  snapToEdge: true,
  tabTextActiveStyle: {},
  tabTextContainerActiveStyle: {},
  tabTextContainerStyle: {},
  tabTextStyle: {},
  tabsWrapperStyle: {}
}

export default StickyParallaxHeader
