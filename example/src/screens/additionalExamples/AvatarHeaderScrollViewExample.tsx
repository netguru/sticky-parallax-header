import { useNavigation } from '@react-navigation/native';
import type { FC } from 'react';
import React from 'react';
import { StatusBar, StyleSheet, View, useColorScheme } from 'react-native';
import { AvatarHeaderScrollView } from 'react-native-sticky-parallax-header';

import { Brandon } from '../../assets/data/cards';
import { IconMenu, iconCloseWhite } from '../../assets/icons';
import { QuizCard } from '../../components';
import { screenStyles } from '../../constants';

import { avatarHeaderTestIDs } from './testIDs';

export const AvatarHeaderScrollViewExample: FC = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <>
      <AvatarHeaderScrollView
        leftTopIcon={iconCloseWhite}
        leftTopIconOnPress={goBack}
        leftTopIconTestID={avatarHeaderTestIDs.headerLeftTopIcon}
        rightTopIcon={IconMenu}
        rightTopIconTestID={avatarHeaderTestIDs.headerRightTopIcon}
        contentContainerStyle={[
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
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {Brandon.cards.map((data, i, arr) => (
            <QuizCard data={data} num={i} key={data.question} cardsAmount={arr.length} />
          ))}
        </View>
      </AvatarHeaderScrollView>
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
