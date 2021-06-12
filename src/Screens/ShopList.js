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
} from 'native-base';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import Loading from '../Components/Loading';
import NotFound from '../Components/NotFound';
import {getStorage} from '../Utils/firebase';
import ShopListItem from '../Components/ShopListItem';

const ShopList = ({navigation, route}) => {
  const {city, town, district} = route.params;
  const [shops, setShops] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log(city, town, district);
    setLoading(true);
    firestore()
      .collection('Shops')
      .where('city', '==', city)
      .where('town', '==', town)
      .where('district', '==', district)
      .get()
      .then(querySnapshot => {
        setShops([]);
        console.log(querySnapshot.size);
        querySnapshot.forEach(doc => {
          getStorage('shop/' + doc.id).then(url => {
            setShops(shops => [...shops, {...doc.data(), image: url}]);
          });
        });
        setLoading(false);
      });
  }, []);
  return (
    <Container>
      <Header style={{backgroundColor: '#62B1F6'}}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Market Listesi</Title>
        </Body>
      </Header>
      {loading ? (
        <Loading />
      ) : shops.length > 0 ? (
        <Content>
          {shops.map(shop => (
            <ShopListItem shop={shop} navigation={navigation} />
          ))}
        </Content>
      ) : (
        <NotFound />
      )}
    </Container>
  );
};

export default ShopList;
