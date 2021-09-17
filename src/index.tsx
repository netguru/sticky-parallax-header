import React, { ReactElement, ReactNode, VFC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { AvatarHeader, TabbedHeader, DetailsHeader } from './predefinedComponents';
import {
  default as StickyParallaxHeaderComponent,
  StickyParallaxHeaderProps,
} from './StickyParallaxHeaderComponent';
import type {
  AvatarHeaderProps,
  TabbedHeaderProps,
  DetailsHeaderProps,
} from './predefinedComponents';

export type { AvatarHeaderProps };
export type { TabbedHeaderProps };
export type { DetailsHeaderProps };
export type { StickyParallaxHeaderProps };

export interface OnChangeTabArguments {
  from: number;
  i: number;
  ref: any;
}

export type MountedTabType = {
  i: number;
  ref: React.ReactElement | React.ReactFragment | null | undefined;
  from: number;
};

export interface Tab {
  content: ReactElement;
  title?: string;
  icon?: ReactElement | ((isActive: boolean) => ReactElement);
}

export interface SharedPredefinedHeaderProps {
  backgroundColor?: string;
  backgroundImage?: StickyParallaxHeaderProps['backgroundImage'];
  bounces?: StickyParallaxHeaderProps['bounces'];
  contentContainerStyles?: StickyParallaxHeaderProps['contentContainerStyles'];
  headerHeight?: StickyParallaxHeaderProps['headerHeight'];
  headerSize?: StickyParallaxHeaderProps['headerSize'];
  keyboardShouldPersistTaps?: StickyParallaxHeaderProps['keyboardShouldPersistTaps'];
  onMomentumScrollBegin?: StickyParallaxHeaderProps['onMomentumScrollBegin'];
  onMomentumScrollEnd?: StickyParallaxHeaderProps['onMomentumScrollEnd'];
  parallaxHeight?: StickyParallaxHeaderProps['parallaxHeight'];
  refreshControl?: StickyParallaxHeaderProps['refreshControl'];
  scrollEvent?: StickyParallaxHeaderProps['scrollEvent'];
  scrollRef?: StickyParallaxHeaderProps['scrollRef'];
  snapStartThreshold?: StickyParallaxHeaderProps['snapStartThreshold'];
  snapStopThreshold?: StickyParallaxHeaderProps['snapStopThreshold'];
  snapToEdge?: StickyParallaxHeaderProps['snapToEdge'];
  snapValue?: StickyParallaxHeaderProps['snapValue'];
  transparentHeader?: StickyParallaxHeaderProps['transparentHeader'];
}

export interface IconProps {
  leftTopIcon?: ImageSourcePropType;
  leftTopIconOnPress?: () => void;
  rightTopIcon?: ImageSourcePropType;
  rightTopIconOnPress?: () => void;
}
export interface RenderBody {
  renderBody?: () => ReactNode;
  children?: ReactNode;
}

type Props = TabbedHeaderProps | AvatarHeaderProps | DetailsHeaderProps | StickyParallaxHeaderProps;

const StickyParallaxHeader: VFC<Props> = (props: Props) => {
  switch (props.headerType) {
    case 'TabbedHeader':
      return <TabbedHeader {...props} />;
    case 'AvatarHeader':
      return <AvatarHeader {...props} />;
    case 'DetailsHeader':
      return <DetailsHeader {...props} />;
    default:
      return <StickyParallaxHeaderComponent {...props} />;
  }
};

export default StickyParallaxHeader;
