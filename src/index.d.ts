import React from 'react';
import { ScrollViewProps, TextStyle, ViewStyle } from 'react-native';

interface HeaderSizeProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TabProps {
  i: number;
  from: number;
  ref: any;
}

interface TabsArray {
  title: string;
  content: React.ReactElement;
}

export interface StickyParallaxHeaderProps {
  background: React.ReactElement;

  backgroundColor: string;

  backgroundImage: React.ReactElement;

  bounces: boolean;

  children: React.ReactElement;

  foreground: React.ReactElement;

  header: React.ReactElement;

  headerHeight: number;

  headerSize: ({ x, y, width, height }: HeaderSizeProps) => void;

  initialPage: number;

  onChangeTab: ({ i, ref, from }: TabProps) => void;

  onEndReached: () => void;

  parallaxHeight: number;

  scrollEvent: ScrollViewProps['onScroll'];

  snapToEdge: boolean;

  tabTextActiveStyle: TextStyle;

  tabTextContainerActiveStyle: ViewStyle;

  tabTextContainerStyle: ViewStyle;

  tabTextStyle: TextStyle;

  tabs: TabsArray[];

  tabsContainerBackgroundColor: string;

  tabsWrapperStyle: ViewStyle;
}
