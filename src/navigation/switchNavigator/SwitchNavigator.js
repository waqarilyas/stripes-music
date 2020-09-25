import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainDrawer from '../drawer/MainDrawer';
import AuthenticationStack from '../stacks/AuthenticationStack';
import LoadingScreen from '../../screens/Loading';

const SwitchNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthenticationStack,
      App: MainDrawer,
      Loading: LoadingScreen,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

export default SwitchNavigator;
