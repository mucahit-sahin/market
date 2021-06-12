import React from 'react';
import {
  Body,
  Button,
  Card,
  CardItem,
  Icon,
  Item,
  Left,
  Right,
  Text,
  Thumbnail,
  View,
} from 'native-base';
import {useDispatch} from 'react-redux';
import {addProductAction} from '../Store/Actions/cardActions';

const ProductListItem = ({navigation, product}) => {
  const dispatch = useDispatch();
  const addProductToCart = () => {
    dispatch(addProductAction(product));
  };
  return (
    <View
      onPress={() =>
        navigation.navigate('ProductDetails', {
          data: product,
        })
      }>
      <Card>
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri: product.image,
              }}
            />
          </Left>
          <Body style={{display: 'flex', justifyContent: 'center'}}>
            <Text>{product.name}</Text>
            <Text note>{product.category}</Text>
          </Body>
          <Right>
            <Text>{product.price} TL</Text>
          </Right>
          <Right>
            <Button
              rounded
              style={{backgroundColor: '#62B1F6'}}
              onPress={() => addProductToCart()}>
              <Icon name="add-circle" />
            </Button>
          </Right>
        </CardItem>
      </Card>
    </View>
  );
};

export default ProductListItem;
