import React, { Component } from 'react'
import { func, number, node, arrayOf, string, bool } from 'prop-types'
import { Animated, ScrollView, View, ImageBackground } from 'react-native'
import styles from './styles'
import { ScrollableTabView, ScrollableTabBar } from './components'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

class StickyParalaxHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nScroll: new Animated.Value(0),
      scrollHeight: 65
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
    this.setContentHeight()
  }

  setContentHeight = () => {
    this.tab.measure((ox, oy, width, height) => this.setState({ contentHeight: height }))
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

  renderTabs = () => {
    const { tabs, locked, initialPage, renderCount } = this.props
    const shouldRenderTabs = tabs && tabs.length > 0
    const { nScroll, scrollHeight } = this.state

    const tabY = nScroll.interpolate({
      inputRange: [0, scrollHeight, scrollHeight + 1],
      outputRange: [0, 0, 1]
    })

    return shouldRenderTabs ? (
      <ScrollableTabView
        initialPage={initialPage}
        onChangeTab={tab => this.onChangeTabHandler(tab)}
        locked={locked}
        renderTabBar={props => (
          <Animated.View
            style={[
              styles.singleTabContainer,
              {
                transform: [{ translateY: tabY }]
              }
            ]}
          >
            <ScrollableTabBar {...props} renderCount={renderCount} />
          </Animated.View>
        )}
      >
        {tabs.map(item => (
          <View
            style={styles.tabWrapper}
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
    ) : null
  }

  renderHeader = () => {
    const { headerHeight, header } = this.props

    return (
      <View style={[styles.toolbar, { height: headerHeight }]}>
        <Animated.View style={[styles.toolbarWrapper, { height: headerHeight }]}>
          <View style={styles.titleWrapper}>{header}</View>
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
  renderCount: func,
  onChangeTab: func,
  tabs: arrayOf(string),
  backgroundImage: number,
  background: node,
  scrollEvent: func
}

StickyParalaxHeader.defaultProps = {
  headerHeight: 70,
  parallaxHeight: 0
}

export default StickyParalaxHeader
