import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import type { User } from '../assets/data/cards';

import type { ROUTES } from './routes';

export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.CARD]: { user?: User };
  [ROUTES.SIMS]: undefined;
  [ROUTES.YODA]: undefined;
  [ROUTES.STICKY_HEADER_FLATLIST]: undefined;
  [ROUTES.STICKY_HEADER_SCROLLVIEW]: undefined;
  [ROUTES.STICKY_HEADER_SECTIONLIST]: undefined;
  [ROUTES.TABBED_HEADER_LIST]: undefined;
  [ROUTES.TABBED_HEADER_PAGER]: undefined;
  [ROUTES.AVATAR_HEADER_FLATLIST]: undefined;
  [ROUTES.AVATAR_HEADER_SCROLLVIEW]: undefined;
  [ROUTES.AVATAR_HEADER_SECTIONLIST]: undefined;
  [ROUTES.DETAILS_HEADER_FLATLIST]: undefined;
  [ROUTES.DETAILS_HEADER_SCROLLVIEW]: undefined;
  [ROUTES.DETAILS_HEADER_SECTIONLIST]: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

export type CardRouteProp = RouteProp<RootStackParamList, 'Card'>;
