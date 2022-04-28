import { useNavigation } from '@react-navigation/native';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import type { SectionListData } from 'react-native';
import { StyleSheet, useColorScheme } from 'react-native';

// TODO: Change path when removing old API
import { AvatarHeaderSectionList } from '../../../../src/predefinedComponents/AvatarHeader/AvatarHeaderSectionList';
import { Brandon } from '../../assets/data/cards';
import QuizCard from '../../components/QuizCard/QuizCard';
import { SectionFooter } from '../../components/primitiveComponents/SectionFooter';
import { SectionHeader } from '../../components/primitiveComponents/SectionHeader';

export const AvatarHeaderSectionListExample: FC = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  const isDarkTheme = useColorScheme() === 'dark';

  const sections = useMemo(() => {
    const section: SectionListData<typeof Brandon.cards[0]> = {
      data: Brandon.cards,
      keyExtractor: (item) => item.question,
      renderItem: ({ item, index }) => <QuizCard data={item} num={index} cardsAmount={Brandon.cards.length} />,
    };

    return [ section, section, section ];
  }, []);

  return <AvatarHeaderSectionList
    leftTopIcon={require('../../assets/icons/iconCloseWhite.png')}
    leftTopIconOnPress={goBack}
    rightTopIcon={require('../../assets/icons/Icon-Menu.png')}
    contentContainerStyle={[ styles.content, isDarkTheme ? styles.darkBackground : styles.lightBackground ]}
    backgroundColor={Brandon.color}
    hasBorderRadius
    image={Brandon.image}
    subtitle={Brandon.about}
    title={Brandon.author}
    renderSectionHeader={() => {
      return <SectionHeader />;
    }}
    renderSectionFooter={() => {
      return <SectionFooter />;
    }}
    sections={sections}
  />;
};

const styles = StyleSheet.create({
  content: {
    alignSelf: 'stretch',
    paddingHorizontal: 24,
  },
  darkBackground: {
    backgroundColor: 'black',
  },
  lightBackground: {
    backgroundColor: 'white',
  },
});
