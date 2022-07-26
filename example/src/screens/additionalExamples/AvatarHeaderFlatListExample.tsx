import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { AvatarHeaderFlatList } from 'react-native-sticky-parallax-header';

import { Brandon } from '../../assets/data/cards';
import { IconMenu, iconCloseWhite } from '../../assets/icons';
import { QuizCard } from '../../components';
import { screenStyles } from '../../constants';

import { avatarHeaderTestIDs } from './testIDs';

export const AvatarHeaderFlatListExample: React.FC = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <>
      <AvatarHeaderFlatList
        leftTopIcon={iconCloseWhite}
        leftTopIconOnPress={goBack}
        leftTopIconTestID={avatarHeaderTestIDs.headerLeftTopIcon}
        rightTopIcon={IconMenu}
        rightTopIconTestID={avatarHeaderTestIDs.headerRightTopIcon}
        contentContainerStyle={[
          styles.content,
          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground,
        ]}
        containerStyle={screenStyles.stretchContainer}
        backgroundColor={Brandon.color}
        hasBorderRadius
        image={Brandon.image}
        subtitle={Brandon.about}
        subtitleTestID={avatarHeaderTestIDs.subtitle}
        title={Brandon.author}
        titleStyle={screenStyles.text}
        titleTestID={avatarHeaderTestIDs.title}
        data={Brandon.cards}
        keyExtractor={(item) => item.question}
        renderItem={({ item, index }) => (
          <QuizCard data={item} num={index} cardsAmount={Brandon.cards.length} />
        )}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar barStyle="light-content" backgroundColor={Brandon.color} translucent />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 24,
  },
});
