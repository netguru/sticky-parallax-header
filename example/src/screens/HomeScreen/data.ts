import { Brandon, Ewa, Jennifer } from '../../assets/data/cards';

import { homeScreenTestIDs } from './testIDs';

export const TABS = [
  {
    title: 'Popular',
    contentTitle: 'Popular Quizes',
    testID: homeScreenTestIDs.popularQuizesTab,
    contentTestID: homeScreenTestIDs.popularQuizesHeader,
  },
  {
    title: 'Product Design',
    contentTitle: 'Product Design',
    testID: homeScreenTestIDs.productDesignTab,
    contentTestID: homeScreenTestIDs.productDesignHeader,
  },
  {
    title: 'Development',
    contentTitle: 'Development',
    testID: homeScreenTestIDs.developmentTab,
    contentTestID: homeScreenTestIDs.developmentHeader,
  },
  {
    title: 'Project Management',
    contentTitle: 'Project Management',
    testID: homeScreenTestIDs.projectManagementTab,
    contentTestID: homeScreenTestIDs.projectManagementHeader,
  },
];

export const users = [Brandon, Jennifer, Ewa];
