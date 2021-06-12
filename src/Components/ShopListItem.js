import {Body, Item, Left, Right, Text} from 'native-base';
import React from 'react';
import {Image} from 'react-native';

const ShopListItem = ({shop, navigation}) => {
  return (
    <Item
      style={{padding: 10}}
      key={shop.id}
      onPress={() => navigation.navigate('Shop', {data: shop})}>
      <Left>
        <Image
          source={{
            uri: shop.image,
          }}
          style={{width: 75, height: 75}}
        />
      </Left>
      <Body>
        <Text>{shop.shopName}</Text>
      </Body>
      <Right>
        <Text style={{color: 'green'}}>{shop.rating}</Text>
      </Right>
    </Item>
  );
};

export default ShopListItem;
