import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { shape } from 'prop-types';
import { QuizListElement } from '../../components';
import { sizes, constants } from '../../../constants';
import styles from '../../TabbedHeader/TabbedHeader.styles';
import { Brandon } from '../../../assets/data/cards';

const RenderContent = ({ user }) => {
  const [contentHeight, setContentHeight] = useState('');
  const title = "Author's Quizes";
  const cards = [
    {
      id: '4850294857',
      elements: user.cardsAmount,
      authorName: user.author,
      mainText: user.label,
      labelText: user.type,
      imageSource: user.image,
    },
  ];

  const calcMargin = () => {
    let marginBottom = 0;

    if (contentHeight) {
      const padding = 24;
      const isBigContent = constants.deviceHeight - contentHeight < 0;

      if (isBigContent) {
        return marginBottom;
      }

      marginBottom = constants.deviceHeight - padding - sizes.headerHeight - contentHeight;

      return marginBottom;
    }

    return marginBottom;
  };

  const onLayoutContent = (e) => {
    setContentHeight(e.nativeEvent.layout.height);
  };

  const marginContentBottom = Platform.select({ ios: calcMargin(), android: 0 });

  return (
    <View
      onLayout={onLayoutContent}
      style={[
        styles.content,
        {
          marginBottom: marginContentBottom,
          paddingBottom: sizes.userScreenParallaxHeader,
        },
      ]}>
      <Text style={styles.contentText}>{title}</Text>
      {cards.map((card) => (
        <QuizListElement
          key={card.id}
          elements={card.elements}
          authorName={card.authorName}
          mainText={card.mainText}
          labelText={card.labelText}
          imageSource={card.imageSource}
        />
      ))}
    </View>
  );
};

RenderContent.propTypes = {
  user: shape({}),
};

RenderContent.defaultProps = {
  user: Brandon,
};

export default RenderContent;
