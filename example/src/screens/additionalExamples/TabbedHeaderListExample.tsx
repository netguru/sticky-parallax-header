import type { FC } from 'react';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { TabbedHeaderList } from 'react-native-sticky-parallax-header';

import { TABBED_SECTIONS } from '../../assets/data/tabbedSections';
import { photosPortraitMe } from '../../assets/images';
import { TabbedSectionHeader } from '../../components/predefinedComponents/TabbedSectionHeader';
import {
  TABBED_SECTION_ITEM_HEIGHT,
  TabbedSectionItem,
} from '../../components/predefinedComponents/TabbedSectionItem';
import { colors, screenStyles } from '../../constants';

export const TabbedHeaderListExample: FC = () => {
  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <>
      <TabbedHeaderList
        contentContainerStyle={[
          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground,
        ]}
        containerStyle={screenStyles.stretchContainer}
        backgroundColor={colors.primaryGreen}
        foregroundImage={photosPortraitMe}
        title={"Mornin' Mark! \nReady for a quiz?"}
        titleStyle={screenStyles.text}
        parallaxHeight={250}
        tabs={TABBED_SECTIONS.map(({ title }) => ({ title }))}
        tabTextStyle={screenStyles.text}
        sections={TABBED_SECTIONS}
        keyExtractor={(_, i) => `${i}`}
        renderItem={({ item }) => <TabbedSectionItem {...item} />}
        renderSectionHeader={({ section }) => <TabbedSectionHeader title={section.title} />}
        getItemLayout={(_, index) => ({
          length: TABBED_SECTION_ITEM_HEIGHT,
          offset: TABBED_SECTION_ITEM_HEIGHT * index,
          index,
        })}
        updateCellsBatchingPeriod={100}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryGreen} translucent />
    </>
  );
};
