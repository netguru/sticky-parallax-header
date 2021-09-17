import React, { useCallback, useState, VFC } from 'react';
import {
  Text,
  View,
  StatusBar,
  Modal,
  Platform,
  RefreshControl,
  LayoutChangeEvent,
} from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { QuizListElement, UserModal } from '../../components';
import { constants, colors, sizes } from '../../constants';
import styles from './HomeScreen.styles';
import { Brandon, Jennifer, Ewa, User } from '../../assets/data/cards';
import { useNavigation } from '@react-navigation/native';

const users = [Brandon, Jennifer, Ewa];

const wait = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

const HomeScreen: VFC = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<User>();
  const [contentHeight, setContentHeight] = useState<{ [key: string]: number }>({});

  const openUserModal = (userSelected: User) => {
    setUserSelected(() => {
      setModalVisible(true);
      return { ...userSelected };
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, [refreshing, setRefreshing]);

  const renderQuizElements = (title: string) => {
    return users.map(
      (user) =>
        (title === 'Popular Quizes' || title === user.type) && (
          <QuizListElement
            key={user.author}
            elements={user.cardsAmount}
            authorName={user.author}
            mainText={user.label}
            labelText={user.type}
            imageSource={user.image}
            onPress={() => navigation.navigate('Card', { user })}
            pressUser={() => openUserModal(user)}
          />
        )
    );
  };

  const renderModal = () => {
    return (
      <Modal animationType="slide" transparent visible={modalVisible} style={styles.modalStyle}>
        <View style={styles.modalContentContainer}>
          <UserModal
            setModalVisible={setModalVisible}
            navigation={navigation}
            onPressCloseModal={() => setModalVisible(false)}
            user={userSelected}
          />
        </View>
      </Modal>
    );
  };

  const calcMargin = (title: string): number => {
    let marginBottom = 50;

    if (contentHeight[title]) {
      const padding = 24;
      const isBigContent = constants.deviceHeight - contentHeight[title] < 0;

      if (isBigContent) {
        return marginBottom;
      }

      marginBottom =
        constants.deviceHeight - padding * 2 - sizes.headerHeight - contentHeight[title];

      return marginBottom > 0 ? marginBottom : 0;
    }

    return marginBottom;
  };

  const onLayoutContent = (title: string) => (e: LayoutChangeEvent) => {
    setContentHeight((prevHeight) => {
      debugger;
      return { ...prevHeight, [title]: e.nativeEvent.layout.height };
    });
  };

  const renderContent = (title: string) => {
    const marginBottom = Platform.select({ ios: calcMargin(title), android: 0 });

    return (
      <View onLayout={onLayoutContent(title)} style={[styles.content, { marginBottom }]}>
        {renderModal()}
        <Text style={styles.contentText}>{title}</Text>
        {renderQuizElements(title)}
      </View>
    );
  };

  const tabs = [
    {
      title: 'Popular',
      content: renderContent('Popular Quizes'),
    },
    {
      title: 'Product Design',
      content: renderContent('Product Design'),
    },
    {
      title: 'Development',
      content: renderContent('Development'),
    },
    {
      title: 'Project Management',
      content: renderContent('Project Management'),
    },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryGreen} translucent />
      <StickyParallaxHeader
        headerType={'TabbedHeader'}
        refreshControl={
          <RefreshControl
            //  z Index is required on IOS, to refresh indicator be visible
            /* eslint-disable-next-line react-native/no-inline-styles */
            style={{ zIndex: 1 }}
            refreshing={refreshing}
            titleColor="white"
            tintColor="white"
            title="Refreshing"
            onRefresh={onRefresh}
          />
        }
        tabs={tabs}
        rememberTabScrollPosition
        logo={require('../../assets/images/logo.png')}
        title={"Mornin' Mark! \nReady for a quiz?"}
        foregroundImage={require('../../assets/images/photosPortraitMe.png')}
      />
    </>
  );
};

export default HomeScreen;
