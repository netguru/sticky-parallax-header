import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { DetailsHeaderScrollView } from 'react-native-sticky-parallax-header';

import { Brandon } from '../../assets/data/cards';
import { CardsBlack, IconMenu, iconCloseWhite } from '../../assets/icons';
import { QuizCard } from '../../components';
import { screenStyles } from '../../constants';

import { detailsHeaderTestIDs } from './testIDs';

export const DetailsHeaderScrollViewExample: React.FC = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <>
      <DetailsHeaderScrollView
        leftTopIcon={iconCloseWhite}
        leftTopIconOnPress={goBack}
        leftTopIconTestID={detailsHeaderTestIDs.headerLeftTopIcon}
        rightTopIcon={IconMenu}
        rightTopIconTestID={detailsHeaderTestIDs.headerRightTopIcon}
        contentContainerStyle={[
          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground,
        ]}
        containerStyle={screenStyles.stretchContainer}
        contentIcon={CardsBlack}
        contentIconNumber={10}
        contentIconNumberTestID={detailsHeaderTestIDs.contentIconNumber}
        backgroundColor={Brandon.color}
        hasBorderRadius
        image={Brandon.image}
        tag={Brandon.type}
        tagTestID={detailsHeaderTestIDs.tag}
        title={Brandon.author}
        titleStyle={screenStyles.text}
        titleTestID={detailsHeaderTestIDs.title}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {Brandon.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
      </DetailsHeaderScrollView>
      <StatusBar barStyle="light-content" backgroundColor={Brandon.color} translucent />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 24,
  },
});
