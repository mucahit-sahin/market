import {
  Body,
  Container,
  Content,
  Header,
  Left,
  Right,
  Title,
  View,
  Text,
  Item,
  Label,
  Input,
  Button,
  Icon,
} from 'native-base';
import React from 'react';
import {Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import Loading from '../Components/Loading';

const Profile = () => {
  const user = useSelector(state => state.user);
  const [userData, setUserData] = React.useState();
  const [image, setImage] = React.useState();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    firestore()
      .collection('Users')
      .doc(user.email)
      .get()
      .then(querySnapshot => {
        setUserData(querySnapshot.data());
        setLoading(false);
      });
  }, []);
  return (
    <Container>
      <Header style={{backgroundColor: '#62B1F6'}}>
        <Left></Left>
        <Body>
          <Title>Profil</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => auth().signOut()}>
            <Icon name="log-out-outline" />
          </Button>
        </Right>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <Content>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 10,
              alignItems: 'center',
            }}>
            <Image
              style={{width: 100, height: 100, borderRadius: 50}}
              source={
                image
                  ? {uri: image}
                  : {
                      uri:
                        'https://kstu.edu.tr/kstu-file/uploads/default-user-image.png',
                    }
              }
            />
            <Text style={{maxWidth: 200, marginLeft: 10, color: 'green'}}>
              {userData?.fullName}
            </Text>
          </View>
          <View style={{padding: 10}}>
            <Item fixedLabel>
              <Label>İl</Label>
              <Input disabled value={userData?.city} />
            </Item>
            <Item fixedLabel>
              <Label>İlçe</Label>
              <Input disabled value={userData?.town} />
            </Item>
            <Item fixedLabel>
              <Label>Mahalle</Label>
              <Input disabled value={userData?.district} />
            </Item>
            <Item fixedLabel>
              <Label>Adres</Label>
              <Input disabled value={userData?.address} />
            </Item>
          </View>
        </Content>
      )}
    </Container>
  );
};

export default Profile;
