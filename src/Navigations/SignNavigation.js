import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';

const SignStack = createStackNavigator();

const SignNavigation = () => {
  return (
    <NavigationContainer>
      <SignStack.Navigator initialRouteName="Login">
        <SignStack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <SignStack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
      </SignStack.Navigator>
    </NavigationContainer>
  );
};

export default SignNavigation;
