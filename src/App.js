import React from 'react';
import auth from '@react-native-firebase/auth';

import SignNavigation from './Navigations/SignNavigation';
import {TouchableOpacity, TouchableOpacityBase, View} from 'react-native';
import {Text} from 'native-base';
import TabNavigation from './Navigations/TabNavigation';

const App = () => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [user]);

  if (initializing) return null;

  if (!user) {
    return <SignNavigation />;
  }

  return <TabNavigation />;
};

export default App;
