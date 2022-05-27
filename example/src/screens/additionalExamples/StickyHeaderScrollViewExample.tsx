import type { FC } from 'react';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StickyHeaderScrollView } from 'react-native-sticky-parallax-header';

import { DATA } from '../../assets/data/paragraphs';
import { Header } from '../../components/primitiveComponents/Header';
import { Paragraph } from '../../components/primitiveComponents/Paragraph';
import { Tabs } from '../../components/primitiveComponents/Tabs';
import { screenStyles } from '../../constants';

export const StickyHeaderScrollViewExample: FC = () => {
  return (
    <SafeAreaView style={screenStyles.screenContainer}>
      <StickyHeaderScrollView
        containerStyle={screenStyles.stretchContainer}
        renderHeader={() => <Header />}
        renderTabs={() => <Tabs />}>
        {DATA.map((item, i) => (
          <Paragraph key={i} text={item} />
        ))}
      </StickyHeaderScrollView>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
    </SafeAreaView>
  );
};
