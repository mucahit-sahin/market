import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import PayStack from './PayStack';
import Shop from '../Screens/Shop';

const Tab = createBottomTabNavigator();

const ShopTabNavigation = ({navigation, route}) => {
  const {data} = route.params;
  return (
    <Tab.Navigator initialRouteName="Shop">
      <Tab.Screen
        name="Shop"
        children={() => <Shop data={data} />}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="package" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={PayStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ShopTabNavigation;
