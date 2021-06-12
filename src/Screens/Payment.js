import {Button, Container, Text, View} from 'native-base';
import React from 'react';
import {CreditCardInput} from 'react-native-credit-card-input';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';

import {clearCartAction} from '../Store/Actions/cardActions';

const Payment = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {address, city, town, district} = route.params;
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);
  const shop = useSelector(state => state.shop);
  const totalPrice = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };
  const pay = () => {
    const data = {
      user: user.email,
      shop: shop.id,
      cart: cart,
      city: city,
      town: town,
      district: district,
      address: address,
      orderStatus: 1,
      totalPrice: totalPrice(),
    };
    firestore()
      .collection('Orders')
      .add(data)
      .then(() => {
        console.log('Cart added!');
        dispatch(clearCartAction());
        navigation.navigate('Home');
      });
    cart.map(product => {
      let stock = parseInt(product.stock) - 1;
      firestore().collection('Products').doc(product.key).update({
        stock: stock.toString(),
      });
    });
  };
  return (
    <Container style={{justifyContent: 'center'}}>
      <CreditCardInput />
      <Button
        full
        rounded
        style={{
          backgroundColor: '#62B1F6',
          margin: 10,
        }}
        onPress={() => pay()}>
        <Text>Öde</Text>
      </Button>
    </Container>
  );
};

export default Payment;
