import React from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Item,
  Left,
  Right,
  Text,
  Title,
  View,
} from 'native-base';
import {connect, useDispatch} from 'react-redux';
import {Alert, Image} from 'react-native';
import {deleteCartItemAction} from '../Store/Actions/cardActions';

const Cart = ({navigation, cart}) => {
  const dispatch = useDispatch();
  const totalPrice = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };
  const confirmCart = () => {
    if (totalPrice() > 30) {
      navigation.navigate('ConfirmOrder', {totalPrice: totalPrice()});
    } else {
      Alert.alert('Uyarı', 'Lütfen minimum 30 tlik alışveriş yapınız.');
    }
  };
  const deleteCartItem = index => {
    dispatch(deleteCartItemAction(index));
  };
  return (
    <Container>
      <Header style={{backgroundColor: '#62B1F6'}}>
        <Body>
          <Title>Sepet</Title>
        </Body>
        <Right>
          <Title>{totalPrice()} TL</Title>
        </Right>
      </Header>
      {cart?.length == 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Sepet boş.</Text>
        </View>
      ) : (
        <Content>
          {cart.map((product, index) => (
            <Item key={product.key} style={{padding: 10}}>
              <Left>
                <Image
                  source={{uri: product.image}}
                  style={{height: 50, width: 50}}
                />
              </Left>
              <Body>
                <Text>{product.name}</Text>
              </Body>
              <Right>
                <Text>
                  {product.quantity}x{product.price}
                </Text>
              </Right>
              <Right>
                <Button
                  rounded
                  style={{backgroundColor: 'red'}}
                  onPress={() => deleteCartItem(index)}>
                  <Icon name="trash" />
                </Button>
              </Right>
            </Item>
          ))}
        </Content>
      )}
      {cart?.length > 0 && (
        <Button
          full
          rounded
          style={{
            backgroundColor: '#62B1F6',
            margin: 10,
          }}
          onPress={() => confirmCart()}>
          <Text>Sepeti Onayla</Text>
        </Button>
      )}
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};
export default connect(mapStateToProps, null)(Cart);
