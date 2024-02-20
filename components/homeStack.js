// HomeStack.js
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import Login from './Login';


const screens = {
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Beehives',
    },
  },
};

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);