import React, { Component } from 'react'
import { Animated, ScrollView, View } from 'react-native'
import { func, number, node, arrayOf, string, bool } from 'prop-types'
import { colors } from './constants'
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
    const { contentHeight, scrollHeight } = this.state
    const { headerHeight } = this.props
    const { y } = event.nativeEvent.contentOffset
    if (y > 0 && y < scrollHeight / 2) {
      this.scroll.getNode().scrollTo({ x: 0, y: 0, animate: true })
    } else if (scrollHeight / 2 <= y && y < scrollHeight) {
      this.scroll.getNode().scrollTo({ x: 0, y: headerHeight - 41, animate: true })
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

    const tabWrapper = {
      zIndex: 1,
      width: '100%'
    }

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
              tabWrapper,
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

  render() {
    const { headerHeight, header, foreground, children } = this.props
    const { nScroll, scrollHeight } = this.state

    const headerStyle = {
      width: '100%',
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
      backgroundColor: colors.primaryGreen,
      marginBottom: 5,
      paddingBottom: 3
    }

    const titleOpacity = nScroll.interpolate({
      inputRange: [0, scrollHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    const headerBorderRadius = nScroll.interpolate({
      inputRange: [0, scrollHeight],
      outputRange: [70, 0],
      extrapolate: 'extend'
    })

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
            listener: event => this.isCloseToBottom(event.nativeEvent)
          })}
        >
          <Animated.View
            style={{
              transform: [{ translateY: Animated.multiply(nScroll, 0.1) }]
            }}
          >
            <Animated.View
              style={[
                headerStyle,
                {
                  height: headerHeight,
                  borderBottomRightRadius: headerBorderRadius
                }
              ]}
            >
              {foreground}
              {this.renderTabs()}
            </Animated.View>
          </Animated.View>
          {children}
        </AnimatedScrollView>
        <View style={styles.toolbar}>
          <Animated.View style={styles.toolbarWrapper}>
            <Animated.View
              style={[
                styles.titleWrapper,
                {
                  opacity: titleOpacity
                }
              ]}
            >
              {header}
            </Animated.View>
          </Animated.View>
        </View>
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
  children: node,
  renderCount: func,
  onChangeTab: func,
  tabs: arrayOf(string)
}

StickyParalaxHeader.defaultProps = {
  headerHeight: 250
}

export default StickyParalaxHeader
