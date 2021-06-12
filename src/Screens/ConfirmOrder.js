import React from 'react';
import {
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
  Text,
  Title,
} from 'native-base';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';

const ConfirmOrder = ({navigation, route}) => {
  const {totalPrice} = route.params;
  const shop = useSelector(state => state.shop);
  const [address, setAddress] = React.useState('');
  const confirmOrder = () => {
    if (address.trim() != '') {
      navigation.navigate('Payment', {
        address: address,
        city: shop.city,
        town: shop.town,
        district: shop.district,
      });
    } else {
      Alert.alert('Uyarı', 'Lütfen adresi giriniz !');
    }
  };
  return (
    <Container>
      <Header style={{backgroundColor: '#62B1F6'}}>
        <Left>
          <Button rounded transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Siparişi Doğrula</Title>
        </Body>
      </Header>
      <Content style={{marginHorizontal: 10}}>
        <Item fixedLabel>
          <Label>Market Adı</Label>
          <Input disabled value={shop.shopName} />
        </Item>
        <Item fixedLabel>
          <Label>Toplam Tutar</Label>
          <Input disabled value={totalPrice.toString()} />
        </Item>
        <Item fixedLabel>
          <Label>İl</Label>
          <Input disabled value={shop.city} />
        </Item>
        <Item fixedLabel>
          <Label>İlçe</Label>
          <Input disabled value={shop.town} />
        </Item>
        <Item fixedLabel>
          <Label>Mahalle</Label>
          <Input disabled value={shop.district} />
        </Item>
        <Item fixedLabel>
          <Label>Adress</Label>
          <Input
            value={address}
            onChangeText={text => setAddress(text)}
            multiline={true}
            numberOfLines={3}
          />
        </Item>
      </Content>
      <Button
        full
        info
        rounded
        style={{margin: 10}}
        onPress={() => confirmOrder()}>
        <Text>Siparişi Doğrula</Text>
      </Button>
    </Container>
  );
};

export default ConfirmOrder;
