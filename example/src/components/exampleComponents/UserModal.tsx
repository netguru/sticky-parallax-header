import { useNavigation } from '@react-navigation/native';
import type { VFC } from 'react';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { AvatarHeaderScrollView } from 'react-native-sticky-parallax-header';

import type { User } from '../../assets/data/cards';
import { screenStyles } from '../../constants';

import QuizListElement from './QuizListElement';

type Props = { user?: User; setModalVisible(v: boolean): void; onPressCloseModal(): void };

const UserModal: VFC<Props> = ({ setModalVisible, user, onPressCloseModal }) => {
  const navigation = useNavigation();

  const renderContent = () => {
    const title = "Author's Quizes";
    const cards = [
      {
        id: '4850294857',
        elements: user?.cardsAmount ?? 0,
        authorName: user?.author ?? '',
        mainText: user?.label ?? '',
        labelText: user?.type ?? '',
        imageSource: user?.image ?? null,
      },
    ];

    return (
      <View style={[screenStyles.content]}>
        <Text style={screenStyles.contentText}>{title}</Text>
        {cards.map((card) => (
          <QuizListElement
            key={card.id}
            elements={card.elements}
            authorName={card.authorName}
            mainText={card.mainText}
            labelText={card.labelText}
            imageSource={card.imageSource}
            onPress={() => {
              setModalVisible(false);
              setTimeout(() => {
                navigation.navigate('Card', { user });
              }, 300);
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={user?.color} barStyle="light-content" />
      <AvatarHeaderScrollView
        image={user?.image ?? { uri: '' }}
        title={user?.author}
        subtitle={user?.about}
        hasBorderRadius
        backgroundColor={user?.color}
        leftTopIconOnPress={onPressCloseModal}
        leftTopIcon={require('../../assets/icons/iconCloseWhite.png')}
        rightTopIcon={require('../../assets/icons/Icon-Menu.png')}>
        {renderContent()}
      </AvatarHeaderScrollView>
    </>
  );
};

export default UserModal;
