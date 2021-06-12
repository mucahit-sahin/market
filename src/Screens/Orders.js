import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {Body, Container, Content, Header, Title} from 'native-base';
import {useSelector} from 'react-redux';
import OrderListItem from '../Components/OrderListItem';
import Loading from '../Components/Loading';
import NotFound from '../Components/NotFound';

const Orders = ({navigation}) => {
  const user = useSelector(state => state.user);
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState();
  React.useEffect(() => {
    setLoading(true);
    firestore()
      .collection('Orders')
      .where('user', '==', user.email)
      .onSnapshot(querySnapshot => {
        setOrders([]);
        querySnapshot.forEach(doc => {
          setOrders(orders => [...orders, {...doc.data(), key: doc.id}]);
        });
        setLoading(false);
      });
  }, []);
  return (
    <Container>
      <Header style={{backgroundColor: '#62B1F6'}}>
        <Body>
          <Title>Siparişlerim</Title>
        </Body>
      </Header>
      {loading ? (
        <Loading />
      ) :orders.length>0? (
        <Content>
          {orders.map(order => (
            <OrderListItem order={order} navigation={navigation} />
          ))}
        </Content>
      ):(<NotFound/>)}
    </Container>
  );
};

export default Orders;
