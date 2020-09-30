import React from 'react';
import { AvatarHeader, TabbedHeader, DetailsHeader } from './predefinedComponents';
import StickyParallaxHeader from './StickyParallaxHeader';

const index = (props) => {
  // eslint-disable-next-line react/prop-types
  switch (props.headerType) {
    case 'TabbedHeader':
      return <TabbedHeader {...props} />;
    case 'AvatarHeader':
      return <AvatarHeader {...props} />;
    case 'DetailsHeader':
      return <DetailsHeader {...props} />;
    default:
      return <StickyParallaxHeader {...props} />;
  }
};

export default index;
