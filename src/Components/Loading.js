import {View} from 'native-base';
import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color="#62B1F6" />
    </View>
  );
};

export default Loading;
