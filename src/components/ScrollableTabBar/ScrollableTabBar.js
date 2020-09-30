/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-return-assign */
import React from 'react';
import { Animated, Text, TouchableOpacity, View, ScrollView, ViewPropTypes } from 'react-native';
import { arrayOf, func, number, object, shape, string, element, oneOfType } from 'prop-types';
import { constants } from '../../constants';
import styles from './ScrollableTabBar.styles';

const UNDERLINE_PADDING = 16;

class ScrollableTabBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.currentXPosition = 0;
    this.state = {
      tabUnderlineWidth: props.tabs.map((_) => 0),
    };
  }

  componentDidUpdate(prevProps) {
    const { activeTab } = this.props;
    if (prevProps.activeTab !== activeTab) {
      this.scrollToTab(activeTab);
    }
  }

  adjustPrevious = (page) => {
    const lastHidden = Math.floor(this.currentXPosition / (constants.deviceWidth * 0.3));
    if (page <= lastHidden) {
      this.currentXPosition = constants.deviceWidth * 0.3 * page;
      this.scrollView.scrollTo({
        x: this.currentXPosition,
      });
    }
  };

  adjustNext = (page) => {
    // eslint-disable-next-line max-len
    const invisibleX =
      constants.deviceWidth + this.currentXPosition - constants.deviceWidth * 0.3 * (page + 1);

    if (invisibleX < 0) {
      this.currentXPosition = this.currentXPosition - invisibleX;
      this.scrollView.scrollTo({
        x: this.currentXPosition,
      });
    }
  };

  scrollToTab = (page) => {
    const { tabs } = this.props;

    if (tabs.length > 3) {
      if (page === 0) {
        this.scrollView.scrollTo({
          x: 0,
        });
        this.currentXPosition = 0;
      } else if (page !== tabs.length - 1) {
        this.adjustPrevious(page - 1);
        this.adjustNext(page + 1);
      } else {
        this.scrollView.scrollToEnd();
        this.currentXPosition = constants.deviceWidth * 0.3 * tabs.length - constants.deviceWidth;
      }
    }
  };

  goToPage = (page) => {
    const { goToPage } = this.props;
    this.scrollToTab(page);

    return goToPage(page);
  };

  renderIcon = (icon, page) => {
    const { activeTab } = this.props;
    const isActive = activeTab === page;
    if (typeof icon === 'function') {
      return icon(isActive);
    }

    return icon;
  };

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
      tabWrapperStyle,
      tabsContainerStyle,
    } = this.props;
    const { tabUnderlineWidth } = this.state;

    const tabWidth = tabs.length > 3 ? constants.deviceWidth * 0.3 : constants.deviceWidth * 0.33;

    const tabUnderlineStyle = {
      position: 'absolute',
      width: tabUnderlineWidth[activeTab] + 2 * UNDERLINE_PADDING,
      marginLeft: (tabWidth - tabUnderlineWidth[activeTab] - 2 * UNDERLINE_PADDING) / 2,
      marginRight: (tabWidth - tabUnderlineWidth[activeTab] - 2 * UNDERLINE_PADDING) / 2,
      bottom: 0,
      borderRadius: 6,
      height: 3,
    };

    const translateX = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, tabWidth],
    });

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: tabsContainerBackgroundColor,
          },
        ]}>
        <ScrollView
          style={styles.nestedStyle}
          contentContainerStyle={[styles.contentContainer, tabsContainerStyle]}
          ref={(r) => (this.scrollView = r)}
          onScrollEndDrag={(event) => (this.currentXPosition = event.nativeEvent.contentOffset.x)}
          vertical={false}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}>
          {tabs.map((tab, page) => {
            const isTabActive = activeTab === page;
            const tabKey = tab.title || `tab ${page}`;

            return (
              <TouchableOpacity
                key={tabKey}
                accessible
                style={tabWrapperStyle}
                accessibilityLabel={tabKey}
                accessibilityTraits="button"
                activeOpacity={0.9}
                onPress={() => this.goToPage(page)}>
                <View
                  style={[
                    styles.tabContainer,
                    tabTextContainerStyle,
                    isTabActive && tabTextContainerActiveStyle,
                  ]}>
                  {this.renderIcon(tab.icon, page)}
                  {tab.title && (
                    <Text
                      // eslint-disable-next-line no-return-assign
                      onLayout={({
                        nativeEvent: {
                          layout: { width },
                        },
                      }) => {
                        const newWidth = [...tabUnderlineWidth];
                        newWidth[page] = width;
                        this.setState({
                          tabUnderlineWidth: newWidth,
                        });
                      }}
                      style={[styles.tabText, tabTextStyle, isTabActive && tabTextActiveStyle]}>
                      {tab.title}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
          <Animated.View
            style={[
              tabUnderlineStyle,
              {
                transform: [
                  {
                    translateX,
                  },
                ],
              },
            ]}
          />
        </ScrollView>
      </View>
    );
  }
}

ScrollableTabBar.propTypes = {
  activeTab: number,
  goToPage: func,
  scrollValue: object,
  tabs: arrayOf(shape({ content: element, title: string, icon: oneOfType([element, func]) })),
  tabTextStyle: shape({}),
  tabTextActiveStyle: shape({}),
  tabTextContainerStyle: shape({}),
  tabTextContainerActiveStyle: shape({}),
  tabsContainerBackgroundColor: string,
  tabWrapperStyle: ViewPropTypes.style,
  tabsContainerStyle: ViewPropTypes.style,
};
export default ScrollableTabBar;
