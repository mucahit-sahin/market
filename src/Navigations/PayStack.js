import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Cart from '../Screens/Cart';
import Payment from '../Screens/Payment';
import ConfirmOrder from '../Screens/ConfirmOrder';

const Stack = createStackNavigator();

const PayStack = ({navigation, route}) => {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <Stack.Navigator initialRouteName="Cart">
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConfirmOrder"
        component={ConfirmOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default PayStack;
