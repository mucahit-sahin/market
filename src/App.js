import React from 'react';
import auth from '@react-native-firebase/auth';

import SignNavigation from './Navigations/SignNavigation';
import TabNavigation from './Navigations/TabNavigation';
import {useDispatch} from 'react-redux';
import {setUserAction} from './Store/Actions/authActions';

const App = () => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();
  const dispatch = useDispatch();
  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch(setUserAction(user));
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
