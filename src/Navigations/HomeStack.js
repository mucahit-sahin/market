import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home';
import ShopList from '../Screens/ShopList';
import ShopTabNavigation from './ShopTabNavigation';

const Stack = createStackNavigator();

const HomeStack = ({navigation, route}) => {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShopList"
        component={ShopList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Shop"
        component={ShopTabNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
