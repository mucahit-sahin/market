import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Orders from '../Screens/Orders';
import OrderDetails from '../Screens/OrderDetails';

const Stack = createStackNavigator();

const OrderStack = ({navigation, route}) => {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <Stack.Navigator initialRouteName="Orders">
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default OrderStack;
