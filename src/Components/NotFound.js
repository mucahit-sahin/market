import {Text, View} from 'native-base';
import React from 'react';

const NotFound = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Not found.</Text>
    </View>
  );
};

export default NotFound;
