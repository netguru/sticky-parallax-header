import React from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { constants } from '../../constants';
import styles from './ScrollableTabBar.styles';
import type { Tab } from 'react-native-sticky-parallax-header';

const UNDERLINE_PADDING = 16;

export type ScrollableTabBarProps = {
  tabs: Tab[];
  activeTab: number;
  goToPage: (index: number) => void;
  scrollValue: Animated.AnimatedInterpolation;
  tabTextStyle: StyleProp<TextStyle>;
  tabTextActiveStyle: StyleProp<TextStyle>;
  tabTextContainerStyle: StyleProp<ViewStyle>;
  tabTextContainerActiveStyle: StyleProp<ViewStyle>;
  tabsContainerBackgroundColor?: string;
  tabWrapperStyle?: StyleProp<ViewStyle>;
  tabsContainerStyle?: StyleProp<ViewStyle>;
};
type State = { tabUnderlineWidth: number[] };

class ScrollableTabBar extends React.PureComponent<ScrollableTabBarProps, State> {
  scrollView: ScrollView | null;

  currentXPosition: number;

  constructor(props: ScrollableTabBarProps) {
    super(props);
    this.currentXPosition = 0;
    this.scrollView = null;
    this.state = {
      tabUnderlineWidth: props.tabs.map((_) => 0),
    };
  }

  componentDidUpdate(prevProps: Readonly<ScrollableTabBarProps>) {
    const { activeTab } = this.props;

    if (prevProps.activeTab !== activeTab) {
      this.scrollToTab(activeTab);
    }
  }

  adjustPrevious = (page: number) => {
    const lastHidden = Math.floor(this.currentXPosition / (constants.deviceWidth * 0.3));

    if (page <= lastHidden) {
      this.currentXPosition = constants.deviceWidth * 0.3 * page;
      this?.scrollView?.scrollTo?.({
        x: this.currentXPosition,
      });
    }
  };

  adjustNext = (page: number) => {
    const invisibleX =
      constants.deviceWidth + this.currentXPosition - constants.deviceWidth * 0.3 * (page + 1);

    if (invisibleX < 0) {
      this.currentXPosition = this.currentXPosition - invisibleX;
      this?.scrollView?.scrollTo?.({
        x: this.currentXPosition,
      });
    }
  };

  scrollToTab = (page: number) => {
    const { tabs } = this.props;

    if (tabs.length > 3) {
      if (page === 0) {
        this?.scrollView?.scrollTo?.({
          x: 0,
        });
        this.currentXPosition = 0;
      } else if (page !== tabs.length - 1) {
        this.adjustPrevious(page - 1);
        this.adjustNext(page + 1);
      } else {
        this?.scrollView?.scrollToEnd?.();
        this.currentXPosition = constants.deviceWidth * 0.3 * tabs.length - constants.deviceWidth;
      }
    }
  };

  goToPage = (page: number) => {
    const { goToPage } = this.props;

    this.scrollToTab(page);

    return goToPage(page);
  };

  renderIcon = (icon: Tab['icon'], page: number) => {
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

export default ScrollableTabBar;
