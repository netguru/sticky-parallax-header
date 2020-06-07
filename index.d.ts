import React from 'react';
import {
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface HeaderTypeProp {
  type?: 'TabbedHeader' | 'DetailsHeader' | 'AvatarHeader'
}

export interface HeaderSizeProps {
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface OnChangeTabArguments {
  from: number;
  i: number;
  ref: any;
}

export interface Tab {
  content: React.ReactElement;
  title: string;
}

export interface SharedProps {
  backgroundColor: string;
  backgroundImage?: ImageSourcePropType;
  headerHeight?: number;
  snapToEdge?: boolean;
  bounces: boolean;

}

export interface IconProps {
  leftTopIcon?: ImageSourcePropType;
  leftTopIconOnPress?: () => void;
  rightTopIcon?: ImageSourcePropType;
  rightTopIconOnPress?: () => void;
}

export interface TabsSharedProps {
  tabTextActiveStyle: TextStyle;
  tabTextContainerActiveStyle: ViewStyle;
  tabTextContainerStyle: ViewStyle;
  tabTextStyle: TextStyle;
  tabWrapperStyle: ViewStyle;
  tabs: Tab[];
  tabsContainerStyle: ViewStyle;
}


export interface TabbedHeaderProps extends SharedProps, TabsSharedProps {
  foregroundImage: ImageSourcePropType;
  header: () => React.ReactElement;
  logo: ImageSourcePropType;
  logoContainerStyle: ViewStyle;
  logoResizeMode: string;
  logoStyle: ViewStyle;
  renderBody: (title: string) => React.ReactElement;
  scrollEvent: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  title: string;
  titleStyle: TextStyle;
}

export interface DetailsHeaderProps extends SharedProps, IconProps {
  hasBorderRadius: boolean;
  iconNumber: number;
  image: number;
  renderBody: (title: string) => React.ReactElement;
  tag: string;
  title: string;
}

export interface AvatarHeaderProps extends SharedProps, IconProps {
  foreground: () => React.ReactElement;
  hasBorderRadius: boolean;
  header: () => React.ReactElement;
  image: number;
  parallaxHeight: number;
  renderBody: (title: string) => React.ReactElement;
  scrollEvent: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  snapStartThreshold: boolean | number;
  snapStopThreshold: boolean | number;
  snapValue: boolean | number;
  subtitle: string;
  title: string;
  transparentHeader: boolean;
}

export interface CustomHeaderProps extends SharedProps, TabsSharedProps {
  background: React.ReactElement;
  children: React.ReactElement;
  foreground: React.ReactElement;
  header: React.ReactElement;
  headerSize?: ({ x, y, width, height }: HeaderSizeProps) => void;
  initialPage: number;
  onChangeTab?: ({ i, ref, from }: OnChangeTabArguments) => void;
  onEndReached?: () => void;
  parallaxHeight: number;
  scrollEvent: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  snapStartThreshold: boolean | number;
  snapStopThreshold: boolean | number;
  snapValue: boolean | number;
  tabsContainerBackgroundColor: string;
  transparentHeader: boolean;
}

type StickyParallaxHeaderProps = HeaderTypeProp & (DetailsHeaderProps | AvatarHeaderProps | TabbedHeaderProps | CustomHeaderProps)

export default class StickyParallaxHeader extends React.Component<StickyParallaxHeaderProps, any> { }