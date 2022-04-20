import type { ReactElement, RefAttributes } from 'react';
import { FlatList } from 'react-native';

import type { StickyHeaderFlatListProps } from './StickyHeaderProps';
import { withStickyHeader } from './withStickyHeader';

type StickyHeaderFlatListType = <ItemT>(
  props: StickyHeaderFlatListProps<ItemT> & RefAttributes<FlatList<ItemT>>
) => ReactElement;

export const StickyHeaderFlatList = withStickyHeader(FlatList) as StickyHeaderFlatListType;
