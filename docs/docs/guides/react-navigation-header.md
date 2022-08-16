---
sidebar_position: 5
---

# React Navigation header and sticky header layout

If react-navigation header inside the screen is used, sticky header component should have `enableSafeAreaTopInset` prop set to `false`, to prevent duplicated margin between react-navigation header and sticky header layout.

Full example code can be found in [example repo](https://github.com/netguru/sticky-parallax-header/blob/master/example/src/screens/additionalExamples/TabbedHeaderWithSectionLists.tsx)

```tsx
const TabbedHeaderWithSectionListsExample: React.FC = () => {
  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <>
      <TabbedHeaderPager
        contentContainerStyle={[
          isDarkTheme ? screenStyles.darkBackground : screenStyles.lightBackground,
        ]}
        backgroundColor={colors.primaryGreen}
        containerStyle={screenStyles.stretchContainer}
        foregroundImage={photosPortraitMe}
        disableScrollToPosition={true}
        enableSafeAreaTopInset={false} // <-------------- disable safe are top inset in sticky header
        rememberTabScrollPosition={false}
        logo={logo}
        title={"Mornin' Mark! \nReady for a quiz?"}
        titleStyle={screenStyles.text}
        titleTestID={tabbedHeaderTestIDs.title}
        stickyTabs={false}
        tabs={QUIZ_TAB_SECTIONS.map((section) => ({
          title: section.title,
          testID: section.testID,
        }))}
        tabTextStyle={screenStyles.text}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <List startIndex={0} />
        </View>
        <View style={styles.content}>
          <List startIndex={1} />
        </View>
        <View style={styles.content}>
          <List startIndex={2} />
        </View>
      </TabbedHeaderPager>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryGreen} translucent />
    </>
  );
};

```
