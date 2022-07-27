import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import type { SectionListData } from 'react-native';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { AvatarHeaderSectionList } from 'react-native-sticky-parallax-header';

import { Brandon } from '../../assets/data/cards';
import { IconMenu, iconCloseWhite } from '../../assets/icons';
import { QuizCard } from '../../components';
import { SectionFooter } from '../../components/primitiveComponents/SectionFooter';
import { SectionHeader } from '../../components/primitiveComponents/SectionHeader';
import { screenStyles } from '../../constants';

import { avatarHeaderTestIDs } from './testIDs';

export const AvatarHeaderSectionListExample: React.FC = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const isDarkTheme = useColorScheme() === 'dark';

  const sections = React.useMemo(() => {
    const section: SectionListData<typeof Brandon.cards[0]> = {
      data: Brandon.cards,
      keyExtractor: (item) => item.question,
      renderItem: ({ item, index }) => (
        <QuizCard data={item} num={index} cardsAmount={Brandon.cards.length} />
      ),
    };

    return [section, section, section];
  }, []);

  return (
    <>
      <AvatarHeaderSectionList
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
        renderSectionHeader={() => {
          return <SectionHeader />;
        }}
        renderSectionFooter={() => {
          return <SectionFooter />;
        }}
        sections={sections}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar barStyle="light-content" backgroundColor={Brandon.color} translucent />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    alignSelf: 'stretch',
    paddingHorizontal: 24,
  },
});
