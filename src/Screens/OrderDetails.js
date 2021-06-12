import React from 'react';
import {
  Badge,
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Text,
  Title,
  View,
} from 'native-base';
import StarRating from 'react-native-star-rating';
import firestore from '@react-native-firebase/firestore';
import OrderStatus from '../Components/OrderStatus';
const OrderDetails = ({navigation, route}) => {
  const {order, shop} = route.params;
  const [rating, setRating] = React.useState(3);
  const setRate = () => {
    firestore()
      .collection('Shops')
      .doc(shop.id)
      .update({
        rating: (shop.rating + rating) / 2,
      })
      .then(() => {
        firestore()
          .collection('Orders')
          .doc(order.key)
          .update({
            orderStatus: order.orderStatus + 1,
            rating: shop.rating,
          })
          .then(() => {
            navigation.goBack();
          });
      });
  };
  return (
    <Container>
      <Header style={{backgroundColor: '#62B1F6'}}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Sipariş Detayları</Title>
        </Body>
      </Header>
      <Content style={{marginHorizontal: 10}}>
        <Item fixedLabel>
          <Label>Market</Label>
          <Input disabled value={shop.shopName} />
        </Item>
        <Item fixedLabel>
          <Label>Adres</Label>
          <Input
            disabled
            multiline={true}
            value={
              order.district +
              ' ' +
              order.address +
              ' ' +
              order.town +
              '/' +
              order.city
            }
          />
        </Item>
        {order.rating && (
          <Item fixedLabel>
            <Label>Puan</Label>
            <Input disabled value={order.rating.toString()} />
          </Item>
        )}
        <OrderStatus position={order.orderStatus - 1} />

        <View style={{padding: 10}}>
          <Label style={{textAlign: 'center'}}>Ürünler</Label>
          {order.cart.map((product, index) => (
            <Item key={index} style={{padding: 5}}>
              <Left>
                <Text>{product.name}</Text>
              </Left>
              <Right>
                <Text>
                  {product.quantity}x{product.price}
                </Text>
              </Right>
            </Item>
          ))}
        </View>
      </Content>
      {order.orderStatus == 4 && (
        <View style={{margin: 20}}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            selectedStar={rating => setRating(rating)}
          />
          <Button
            full
            rounded
            style={{backgroundColor: '#62B1F6', marginTop: 10}}
            onPress={() => setRate()}>
            <Text>Puanla</Text>
          </Button>
        </View>
      )}
    </Container>
  );
};

export default OrderDetails;
