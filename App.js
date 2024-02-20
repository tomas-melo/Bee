// App.js
/*import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './components/HomeScreen';

const screens = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
    },
  },
};

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack); */

/*import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>{"sadhflkj"}</Text>
    </View>
  );
} */

import React from 'react';
import { StyleSheet } from 'react-native';
import HomeStack from './components/homeStack';

export default function App() {
  return (
    <HomeStack />
  );
}
