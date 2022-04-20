import type { ReactElement, RefAttributes } from 'react';
import { ScrollView } from 'react-native';

import type { StickyHeaderScrollViewProps } from './StickyHeaderProps';
import { withStickyHeader } from './withStickyHeader';

type StickyHeaderScrollViewType = (
  props: StickyHeaderScrollViewProps & RefAttributes<ScrollView>
) => ReactElement;

export const StickyHeaderScrollView = withStickyHeader(ScrollView) as StickyHeaderScrollViewType;
