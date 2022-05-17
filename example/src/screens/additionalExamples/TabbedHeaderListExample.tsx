import type { FC } from 'react';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

// TODO: Change path when removing old API
import { TabbedHeaderList } from '../../../../src/predefinedComponents/TabbedHeader/TabbedHeaderList';
import { TABBED_SECTIONS } from '../../assets/data/tabbedSections';
import colors from '../../constants/colors';
import screenStyles from '../../constants/screenStyles';
import { TabbedSectionHeader } from '../../components/predefinedComponents/TabbedSectionHeader';
import { TABBED_SECTION_ITEM_HEIGHT, TabbedSectionItem } from '../../components/predefinedComponents/TabbedSectionItem';

export const TabbedHeaderListExample: FC = () => {
  const isDarkTheme = useColorScheme() === 'dark';

  return <TabbedHeaderList
    contentContainerStyle={[ isDarkTheme ? styles.darkBackground : styles.lightBackground ]}
    containerStyle={screenStyles.stretchContainer}
    backgroundColor={colors.primaryGreen}
    foregroundImage={require('../../assets/images/photosPortraitMe.png')}
    title={'Mornin\' Mark! \nReady for a quiz?'}
    parallaxHeight={250}
    tabs={TABBED_SECTIONS.map(({ title }) => ({ title }))}
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
  />;
};

const styles = StyleSheet.create({
  darkBackground: {
    backgroundColor: 'black',
  },
  lightBackground: {
    backgroundColor: 'white',
  },
});
