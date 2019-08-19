import React from 'react';
import {
  ScrollViewProps,
  TextStyle,
  ViewStyle,
  ImageBackgroundProps,
  ImagePropsBase
} from 'react-native';

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

interface SharedProps {
  headerHeight?: number;

  backgroundImage?: ImageBackgroundProps;

  snapToEdge?: boolean;
}

interface IconProps {
  leftTopIconOnPress?: () => void;

  rightTopIconOnPress?: () => void;

  leftTopIcon?: ImagePropsBase;

  rightTopIcon?: ImagePropsBase;
}

export interface TabbedHeaderProps extends SharedProps {
  headerType: string;

  backgroundColor?: string;

  title?: string;

  bounces?: boolean;

  renderBody?: (title: string) => React.ReactElement;

  tabs?: TabsArray[];
}

export interface DetailsHeaderProps extends SharedProps, IconProps {
  headerType: string;

  backgroundColor?: string;

  title?: string;

  tag?: string;

  image?: ImagePropsBase;

  renderBody?: (title: string) => React.ReactElement;

  bounces?: boolean;

  hasBorderRadius?: boolean;

  iconNumber?: number;
}

export interface AvatarHeaderProps extends SharedProps, IconProps {
  headerType: string;

  backgroundColor?: string;

  title?: string;

  subtitle?: string;

  image?: ImagePropsBase;

  renderBody?: (title: string) => React.ReactElement;

  bounces?: boolean;

  hasBorderRadius?: boolean;
}

export interface CustomHeaderProps extends SharedProps {
  background?: React.ReactElement;

  backgroundColor: string;

  bounces: boolean;

  children?: React.ReactElement;

  foreground: React.ReactElement;

  header: React.ReactElement;

  headerSize?: ({ x, y, width, height }: HeaderSizeProps) => void;

  initialPage?: number;

  onChangeTab?: ({ i, ref, from }: TabProps) => void;

  onEndReached?: () => void;

  parallaxHeight?: number;

  scrollEvent?: ScrollViewProps['onScroll'];

  tabs?: TabsArray[];

  tabTextStyle?: TextStyle;

  tabTextActiveStyle?: TextStyle;

  tabTextContainerStyle?: ViewStyle;

  tabTextContainerActiveStyle?: ViewStyle;

  tabsContainerBackgroundColor?: string;

  tabsWrapperStyle?: ViewStyle;
}
