import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Swiper from 'react-native-swiper';

const Advertising = () => {
  const data = [
    {
      url: 'https://www.bankkart.com.tr/medium/Campaign-ListImage-1065-2x.vsf',
      title: 'Reklam 1',
    },
    {
      url: 'https://www.bankkart.com.tr/medium/Campaign-ListImage-1065-2x.vsf',
      title: 'Reklam 2',
    },
    {
      url: 'https://www.bankkart.com.tr/medium/Campaign-ListImage-1065-2x.vsf',
      title: 'Reklam 3',
    },
  ];
  return (
    <Swiper style={styles.wrapper} showsButtons={true}>
      {data.map(item => (
        <View style={styles.slide1}>
          <ImageBackground
            source={{
              uri: item.url,
            }}
            style={{
              flex: 1,
              resizeMode: 'cover',
              justifyContent: 'center',
            }}>
            <Text style={styles.text}>{item.title}</Text>
          </ImageBackground>
        </View>
      ))}
    </Swiper>
  );
};

export default Advertising;

const styles = StyleSheet.create({
  wrapper: {height: 150},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#62B1F6',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
