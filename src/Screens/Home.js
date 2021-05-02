import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

const Home = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => auth().signOut()}>
        <Text>home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
