import { createAppContainer, createStackNavigator } from 'react-navigation';
import { HomeScreen, CardScreen } from '../screens';

export default createAppContainer(
  createStackNavigator(
    {
      Home: HomeScreen,
      Card: CardScreen,
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        header: null,
      },
    }
  )
);
