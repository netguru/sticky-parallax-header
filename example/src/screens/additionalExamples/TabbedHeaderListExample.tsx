import type { FC } from 'react';
import React from 'react';
import { StatusBar } from 'react-native';
import { TabbedHeaderList } from 'react-native-sticky-parallax-header';

import { TABBED_SECTIONS } from '../../assets/data/tabbedSections';
import { TabbedSectionHeader } from '../../components/predefinedComponents/TabbedSectionHeader';
import {
  TABBED_SECTION_ITEM_HEIGHT,
  TabbedSectionItem,
} from '../../components/predefinedComponents/TabbedSectionItem';
import { colors, screenStyles } from '../../constants';

import { tabbedHeaderTestIDs } from './testIDs';

export const TabbedHeaderListExample: FC = () => {
  return (
    <>
      <TabbedHeaderList
        contentContainerStyle={{ backgroundColor: colors.coralPink }}
        containerStyle={screenStyles.stretchContainer}
        backgroundColor={colors.coralPink}
        title="Food delivery app"
        titleStyle={screenStyles.text}
        titleTestID={tabbedHeaderTestIDs.title}
        foregroundImage={{ uri: 'https://foodish-api.herokuapp.com/images/samosa/samosa9.jpg' }}
        parallaxHeight={100}
        tabs={TABBED_SECTIONS.map(({ title, tabTestID }) => ({ title, testID: tabTestID }))}
        tabTextStyle={screenStyles.text}
        sections={TABBED_SECTIONS}
        tabTextContainerActiveStyle={{ backgroundColor: colors.activeOrange }}
        keyExtractor={(_, i) => `${i}`}
        renderItem={({ item }) => <TabbedSectionItem {...item} />}
        renderSectionHeader={({ section }) => (
          <TabbedSectionHeader title={section.title} tabTestID={section.tabTestID} />
        )}
        getItemLayout={(_, index) => ({
          length: TABBED_SECTION_ITEM_HEIGHT,
          offset: TABBED_SECTION_ITEM_HEIGHT * index,
          index,
        })}
        updateCellsBatchingPeriod={100}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar barStyle="light-content" backgroundColor={colors.coralPink} translucent />
    </>
  );
};
