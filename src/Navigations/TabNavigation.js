import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Profile from '../Screens/Profile';
import Home from '../Screens/Home';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
