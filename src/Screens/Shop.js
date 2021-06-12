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
  Segment,
  Text,
  Title,
  View,
} from 'native-base';
import {Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import ProductListItem from '../Components/ProductListItem';
import {getStorage} from '../Utils/firebase';
import Loading from '../Components/Loading';
import {setShopAction} from '../Store/Actions/shopActions';
import {useDispatch} from 'react-redux';

const Shop = ({navigation, data}) => {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();
  dispatch(setShopAction(data));
  React.useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection('Products')
      .where('id', '==', data.id)
      .onSnapshot(querySnapshot => {
        setProducts([]);
        querySnapshot.forEach(documentSnapshot => {
          getStorage('products/' + documentSnapshot.id).then(url => {
            setProducts(products => [
              ...products,
              {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
                image: url,
              },
            ]);
          });
        });

        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  return (
    <Container>
      <Header style={{backgroundColor: '#62B1F6'}}>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{data.shopName}</Title>
        </Body>
        <View style={{justifyContent: 'center'}}>
          <Image
            source={{uri: data.image}}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'cover',
              marginLeft: 10,
              borderRadius: 20,
            }}
          />
        </View>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <Content>
          {products.map(product => (
            <ProductListItem
              key={product.key}
              navigation={navigation}
              product={product}
            />
          ))}
        </Content>
      )}
    </Container>
  );
};

export default Shop;
