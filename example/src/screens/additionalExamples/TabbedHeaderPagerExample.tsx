import type { FC } from 'react';
import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

// TODO: Change path when removing old API
import { TabbedHeaderPager } from '../../../../src/predefinedComponents/TabbedHeader/TabbedHeaderPager';
import { Brandon, Ewa, Jennifer } from '../../assets/data/cards';
import { TABBED_SECTIONS } from '../../assets/data/tabbedSections';
import QuizCard from '../../components/QuizCard/QuizCard';
import colors from '../../constants/colors';
import screenStyles from '../../constants/screenStyles';

export const TabbedHeaderPagerExample: FC = () => {
  const isDarkTheme = useColorScheme() === 'dark';

  return <TabbedHeaderPager
    contentContainerStyle={[ isDarkTheme ? styles.darkBackground : styles.lightBackground ]}
    containerStyle={screenStyles.stretchContainer}
    backgroundColor={colors.primaryGreen}
    foregroundImage={require('../../assets/images/photosPortraitMe.png')}
    rememberTabScrollPosition
    logo={require('../../assets/images/logo.png')}
    title={'Mornin\' Mark! \nReady for a quiz?'}
    tabs={TABBED_SECTIONS.map((section) => ({ title: section.title }))}
  >
    <View style={styles.content}>
      {Brandon.cards.map((data, i, arr) => 
        <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
      )}
    </View>
    <View style={styles.content}>
      {Ewa.cards.map((data, i, arr) => 
        <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
      )}
    </View>
    <View style={styles.content}>
      {Jennifer.cards.map((data, i, arr) => 
        <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
      )}
    </View>
    <View style={styles.content}>
      {Brandon.cards.map((data, i, arr) => 
        <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
      )}
    </View>
    <View style={styles.content}>
      {Ewa.cards.map((data, i, arr) => 
        <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
      )}
    </View>
    <View style={styles.content}>
      {Jennifer.cards.map((data, i, arr) => 
        <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
      )}
    </View>
  </TabbedHeaderPager>;
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    paddingHorizontal: 24,
  },
  darkBackground: {
    backgroundColor: 'black',
  },
  lightBackground: {
    backgroundColor: 'white',
  },
});
