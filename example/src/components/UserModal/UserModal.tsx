import React, { VFC } from 'react';
import { Text, View, StatusBar } from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import styles from './UserModal.styles';
import QuizListElement from '../QuizListElement/QuizListElement';
import type { User } from '../../assets/data/cards';
import { useNavigation } from '@react-navigation/native';

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
      <View style={[styles.content]}>
        <Text style={styles.contentText}>{title}</Text>
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
      <StickyParallaxHeader
        headerType={'AvatarHeader'}
        image={user?.image ?? { uri: '' }}
        title={user?.author}
        subtitle={user?.about}
        backgroundColor={user?.color}
        leftTopIconOnPress={onPressCloseModal}
        leftTopIcon={require('../../assets/icons/iconCloseWhite.png')}
        rightTopIcon={require('../../assets/icons/Icon-Menu.png')}>
        {renderContent()}
      </StickyParallaxHeader>
    </>
  );
};

export default UserModal;
