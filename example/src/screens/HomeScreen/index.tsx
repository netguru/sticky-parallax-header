import { useNavigation } from '@react-navigation/native';
import type { VFC } from 'react';
import React, { useCallback, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
  Modal,
  Platform,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { TabbedHeaderPager } from 'react-native-sticky-parallax-header';

import type { User } from '../../assets/data/cards';
import { logo, photosPortraitMe } from '../../assets/images';
import { QuizListElement, UserModal } from '../../components';
import { colors, screenStyles } from '../../constants';

import { EXAMPLES, ExampleLink } from './ExampleLink';
import { TABS, users } from './data';

const wait = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

const HomeScreen: VFC = () => {
  const navigation = useNavigation();
  const { height: windowHeight } = useWindowDimensions();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<User>();
  const [contentHeight, setContentHeight] = useState<{ [key: string]: number }>({});

  const openUserModal = useCallback((user: User) => {
    setUserSelected(() => {
      setModalVisible(true);

      return { ...user };
    });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const calcMargin = (title: string): number => {
    let marginBottom = 50;

    if (contentHeight[title]) {
      const padding = 24;
      const isBigContent = windowHeight - contentHeight[title] < 0;

      if (isBigContent) {
        return marginBottom;
      }

      const headerHeight = 92;

      marginBottom = windowHeight - padding * 2 - headerHeight - contentHeight[title];

      return marginBottom > 0 ? marginBottom : 0;
    }

    return marginBottom;
  };

  const onLayoutContent = (title: string) => (e: LayoutChangeEvent) => {
    const newHeight = e.nativeEvent.layout.height;

    setContentHeight((prevHeight) => {
      return { ...prevHeight, [title]: newHeight };
    });
  };

  const navigateToCardScreen = useCallback(
    (user: User) => {
      return () => {
        navigation.navigate('Card', { user });
      };
    },
    [navigation]
  );

  const pressUserModal = useCallback(
    (user: User) => {
      return () => {
        openUserModal(user);
      };
    },
    [openUserModal]
  );

  const onPressCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryGreen} translucent />
      <TabbedHeaderPager
        containerStyle={screenStyles.stretchContainer}
        backgroundColor={colors.primaryGreen}
        tabsContainerBackgroundColor={colors.secondaryGreen}
        rememberTabScrollPosition
        logo={logo}
        title={"Mornin' Mark! \nReady for a quiz?"}
        titleStyle={screenStyles.text}
        offscreenPageLimit={5}
        foregroundImage={photosPortraitMe}
        tabs={TABS.map((tab) => ({ title: tab.title }))}
        tabTextStyle={screenStyles.text}
        // Refresh control is not implemented on web and even if provided, it will double padding top and bottom
        {...(Platform.OS !== 'web' && {
          refreshControl: (
            <RefreshControl
              //  z Index is required on IOS, to refresh indicator be visible
              style={styles.refreshControl}
              refreshing={refreshing}
              titleColor={colors.white}
              tintColor={colors.white}
              title="Refreshing"
              onRefresh={onRefresh}
            />
          ),
        })}>
        {TABS.map((tab, i) => {
          const title = tab.contentTitle;
          const marginBottom = Platform.select({ ios: calcMargin(title) + 20, android: 10 });

          return (
            <View
              key={i}
              onLayout={onLayoutContent(title)}
              style={[screenStyles.content, { marginBottom }]}>
              <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                style={styles.modalStyle}>
                <View style={styles.modalContentContainer}>
                  <UserModal
                    setModalVisible={setModalVisible}
                    onPressCloseModal={onPressCloseModal}
                    user={userSelected}
                  />
                </View>
              </Modal>
              <Text style={screenStyles.contentText}>{title}</Text>
              {users.map(
                (user) =>
                  (title === 'Popular Quizes' || title === user.type) && (
                    <QuizListElement
                      key={user.author}
                      elements={user.cardsAmount}
                      authorName={user.author}
                      mainText={user.label}
                      labelText={user.type}
                      imageSource={user.image}
                      onPress={navigateToCardScreen(user)}
                      pressUser={pressUserModal(user)}
                    />
                  )
              )}
              <Text style={screenStyles.contentText}>Check custom examples</Text>
              {EXAMPLES.map((example) => (
                <ExampleLink key={example.routeName} {...example} />
              ))}
            </View>
          );
        })}
      </TabbedHeaderPager>
    </>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
  },
  modalContentContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  refreshControl: {
    zIndex: 1,
  },
});

export default HomeScreen;
