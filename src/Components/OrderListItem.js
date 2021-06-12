import {Body, Item, Left, Right, Text, Title} from 'native-base';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {Image} from 'react-native';

import {getStorage} from '../Utils/firebase';
const status = [
  'Sipariş Alındı',
  'Sipariş Hazırlanıyor',
  'Sipariş Yolda',
  'Sipariş Teslim Edildi',
];
const OrderListItem = ({navigation, order}) => {
  const [shop, setShop] = React.useState();
  React.useEffect(() => {
    firestore()
      .collection('Shops')
      .doc(order.shop)
      .get()
      .then(querySnapshot => {
        getStorage('shop/' + order.shop).then(url => {
          setShop({...querySnapshot.data(), image: url});
        });
      });
  }, []);
  return (
    <Item
      style={{padding: 10}}
      onPress={() =>
        navigation.navigate('OrderDetails', {order: order, shop: shop})
      }>
      <Left>
        <Image
          source={{
            uri: shop?.image,
          }}
          style={{width: 50, height: 50}}
        />
      </Left>
      <Body>
        <Text style={{textAlign: 'center'}}>{shop?.shopName}</Text>
      </Body>
      <Right>
        <Text style={{textAlign: 'center'}}>
          {order.status != 5 ? status[order.orderStatus - 1] : status[3]}
        </Text>
      </Right>
    </Item>
  );
};

export default OrderListItem;
