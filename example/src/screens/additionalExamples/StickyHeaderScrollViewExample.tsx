import type { FC } from 'react';
import React from 'react';
import { StatusBar, View } from 'react-native';

// TODO: Change path when removing old API
import { StickyHeaderScrollView } from '../../../../src/primitiveComponents/StickyHeaderScrollView';
import { screenStyles } from '../../constants';
import { DATA } from '../../assets/data/paragraphs'
import { Header } from '../../components/primitiveComponents/Header';
import { Tabs } from '../../components/primitiveComponents/Tabs';
import { Paragraph } from '../../components/primitiveComponents/Paragraph';

export const StickyHeaderScrollViewExample: FC = () => {
  return <View style={screenStyles.screenContainer}>
    <StickyHeaderScrollView
      containerStyle={screenStyles.stretchContainer}
      renderHeader={() => <Header />}
      renderTabs={() => <Tabs />}>
      {DATA.map((item, i) => <Paragraph key={i} text={item} />)}
    </StickyHeaderScrollView>
    <StatusBar backgroundColor="transparent" barStyle="dark-content" />
  </View>;
};
