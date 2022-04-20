import type { ReactElement, RefAttributes } from 'react';
import { SectionList } from 'react-native';

import type { StickyHeaderSectionListProps } from './StickyHeaderProps';
import { withStickyHeader } from './withStickyHeader';

type StickyHeaderSectionListType = <ItemT, SectionT>(
  props: StickyHeaderSectionListProps<ItemT, SectionT> & RefAttributes<SectionList<ItemT, SectionT>>
) => ReactElement;

export const StickyHeaderSectionList = withStickyHeader(SectionList) as StickyHeaderSectionListType;
