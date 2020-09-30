import { ReactElement, Component } from 'react';
import {
  ImageSourcePropType,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextStyle,
  ViewStyle,
  ImageResizeMode,
} from 'react-native';

export interface HeaderTypeProp {
  headerType?: 'TabbedHeader' | 'DetailsHeader' | 'AvatarHeader';
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled' | false | true;
  scrollRef?: (ref: ScrollView) => void | object;
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
  content: ReactElement;
  title?: string;
  icon?: ReactElement | ((isActive: boolean) => ReactElement);
}
export interface SharedProps {
  backgroundImage?: ImageSourcePropType;
  headerHeight?: number;
  snapToEdge?: boolean;
  bounces?: boolean;
}

export interface IconProps {
  leftTopIcon?: ImageSourcePropType;
  leftTopIconOnPress?: () => void;
  rightTopIcon?: ImageSourcePropType;
  rightTopIconOnPress?: () => void;
}

export interface TabsSharedProps {
  tabTextActiveStyle?: TextStyle;
  tabTextContainerActiveStyle?: ViewStyle;
  tabTextContainerStyle?: ViewStyle;
  tabTextStyle?: TextStyle;
  tabWrapperStyle?: ViewStyle;
  tabs?: Tab[];
  tabsContainerStyle?: ViewStyle;
}

export type TabbedHeaderProps = SharedProps &
  TabsSharedProps & {
    headerType: 'TabbedHeader';
    backgroundColor?: string;
    foregroundImage?: ImageSourcePropType;
    header?: () => ReactElement;
    logo?: ImageSourcePropType;
    logoContainerStyle?: ViewStyle;
    logoResizeMode?: ImageResizeMode;
    logoStyle?: ViewStyle;
    rememberTabScrollPosition?: boolean;
    renderBody?: (title: string) => ReactElement;
    scrollEvent?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    title?: string;
    titleStyle?: TextStyle;
  };

export type DetailsHeaderProps = SharedProps &
  IconProps & {
    headerType: 'DetailsHeader';
    backgroundColor?: string;
    hasBorderRadius?: boolean;
    iconNumber?: number;
    image?: number;
    renderBody?: (title: string) => ReactElement;
    tag?: string;
    title?: string;
  };

export type AvatarHeaderProps = SharedProps &
  IconProps & {
    headerType: 'AvatarHeader';
    backgroundColor?: string;
    foreground?: () => ReactElement;
    hasBorderRadius?: boolean;
    header?: () => ReactElement;
    image?: number;
    parallaxHeight?: number;
    renderBody?: (title: string) => ReactElement;
    scrollEvent?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    snapStartThreshold?: number;
    snapStopThreshold?: number;
    snapValue?: number;
    subtitle?: string;
    title?: string;
    transparentHeader?: boolean;
  };

export type CustomHeaderProps = SharedProps &
  TabsSharedProps & {
    headerType: undefined;
    background: ReactElement;
    backgroundColor: string;
    children?: ReactElement;
    foreground?: ReactElement;
    header: ReactElement;
    headerSize?: (headerSizeProps: HeaderSizeProps) => void;
    initialPage?: number;
    onChangeTab?: (changeTabArguments: OnChangeTabArguments) => void;
    onEndReached?: () => void;
    parallaxHeight?: number;
    scrollEvent?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    snapStartThreshold?: number;
    snapStopThreshold?: number;
    snapValue?: number;
    tabsContainerBackgroundColor?: string;
    transparentHeader?: boolean;
  };

type StickyParallaxHeaderProps = HeaderTypeProp &
  (DetailsHeaderProps | AvatarHeaderProps | TabbedHeaderProps | CustomHeaderProps);

export default class StickyParallaxHeader extends Component<StickyParallaxHeaderProps, any> {}
