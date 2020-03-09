/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-return-assign */
import React from 'react'
import { Animated, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { array, func, number, object, shape, string } from 'prop-types'
import { constants } from '../../constants'
import styles from './ScrollableTabBar.styles'

const UNDERLINE_PADDING = 16

class ScrollableTabBar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.currentXPosition = 0
    this.state = {
      tabUnderlineWidth: props.tabs.map(_ => 0)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeTab } = this.props
    if (nextProps.activeTab !== activeTab) {
      this.scrollToTab(nextProps.activeTab)
    }
  }

  adjustPrevious = (page) => {
    const lastHidden = Math.floor(this.currentXPosition / (constants.deviceWidth * 0.3))
    if (page <= lastHidden) {
      this.currentXPosition = constants.deviceWidth * 0.3 * page
      this.scrollView.scrollTo({
        x: this.currentXPosition
      })
    }
  }

  adjustNext = (page) => {
    // eslint-disable-next-line max-len
    const invisibleX = constants.deviceWidth + this.currentXPosition - constants.deviceWidth * 0.3 * (page + 1)

    if (invisibleX < 0) {
      this.currentXPosition = this.currentXPosition - invisibleX
      this.scrollView.scrollTo({
        x: this.currentXPosition
      })
    }
  }

  scrollToTab = (page) => {
    const { tabs } = this.props

    if (tabs.length > 3) {
      if (page === 0) {
        this.scrollView.scrollTo({
          x: 0
        })
        this.currentXPosition = 0
      } else if (page !== tabs.length - 1) {
        this.adjustPrevious(page - 1)
        this.adjustNext(page + 1)
      } else {
        this.scrollView.scrollToEnd()
        this.currentXPosition = constants.deviceWidth * 0.3 * tabs.length - constants.deviceWidth
      }
    }
  }

  goToPage = (page) => {
    const { goToPage } = this.props
    this.scrollToTab(page)

    return goToPage(page)
  }

  render() {
    const {
      activeTab,
      scrollValue,
      tabs,
      tabTextStyle,
      tabTextActiveStyle,
      tabTextContainerStyle,
      tabTextContainerActiveStyle,
      tabsContainerBackgroundColor,
      tabsWrapperStyle
    } = this.props
    const { tabUnderlineWidth } = this.state

    const tabWidth = tabs.length > 3 ? constants.deviceWidth * 0.3 : constants.deviceWidth * 0.33

    const tabUnderlineStyle = {
      position: 'absolute',
      width: tabUnderlineWidth[activeTab] + 2 * UNDERLINE_PADDING,
      marginLeft: (tabWidth - tabUnderlineWidth[activeTab] - 2 * UNDERLINE_PADDING) / 2,
      marginRight: (tabWidth - tabUnderlineWidth[activeTab] - 2 * UNDERLINE_PADDING) / 2,
      bottom: 0,
      borderRadius: 6,
      height: 3
    }

    const translateX = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, tabWidth]
    })

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: tabsContainerBackgroundColor
          }
        ]}
      >
        <ScrollView
          style={styles.nestedStyle}
          contentContainerStyle={styles.contentContainer}
          ref={r => (this.scrollView = r)}
          onScrollEndDrag={event => (this.currentXPosition = event.nativeEvent.contentOffset.x)}
          vertical={false}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
        >
          {tabs.map((tab, page) => {
            const isTabActive = activeTab === page

            return (
              <TouchableOpacity
                key={tab.title}
                accessible
                style={tabsWrapperStyle}
                accessibilityLabel={tab.title}
                accessibilityTraits="button"
                activeOpacity={0.9}
                onPress={() => this.goToPage(page)}
              >
                <View
                  style={[
                    styles.tabContainer,
                    tabTextContainerStyle,
                    isTabActive && tabTextContainerActiveStyle
                  ]}
                >
                  <Text
                    // eslint-disable-next-line no-return-assign
                    onLayout={({
                      nativeEvent: {
                        layout: { width }
                      }
                    }) => {
                      const newWidth = [...tabUnderlineWidth]
                      newWidth[page] = width
                      this.setState({
                        tabUnderlineWidth: newWidth
                      })
                    }}
                    style={[styles.tabText, tabTextStyle, isTabActive && tabTextActiveStyle]}
                  >
                    {tab.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
          <Animated.View
            style={[
              tabUnderlineStyle,
              {
                transform: [
                  {
                    translateX
                  }
                ]
              }
            ]}
          />
        </ScrollView>
      </View>
    )
  }
}

ScrollableTabBar.propTypes = {
  activeTab: number,
  goToPage: func,
  scrollValue: object,
  tabs: array,
  tabTextStyle: shape({}),
  tabTextActiveStyle: shape({}),
  tabTextContainerStyle: shape({}),
  tabTextContainerActiveStyle: shape({}),
  tabsContainerBackgroundColor: string,
  tabsWrapperStyle: shape({})
}
export default ScrollableTabBar
