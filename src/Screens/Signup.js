import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Picker,
  Right,
  Text,
  Title,
  View,
} from 'native-base';
import React from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {setUserAction} from '../Store/Actions/authActions';

const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [city, setCity] = React.useState('');
  const [town, setTown] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [address, setAddress] = React.useState('');

  const [cityList, setCityList] = React.useState([]);
  const [townList, setTownList] = React.useState([]);
  const [districtList, setDistrictList] = React.useState([]);
  React.useEffect(() => {
    fetch('https://www.milleni.com.tr/GetCities')
      .then(response => response.json())
      .then(data => {
        setCityList(data);
      });
    if (cityList.length > 0) {
      fetch(
        'https://www.milleni.com.tr/GetCounties?cityId=' +
          cityList[city.index].Id,
      )
        .then(response => response.json())
        .then(data => {
          setTownList(data);
        });
    }
    if (townList.length > 0) {
      fetch(
        'https://www.milleni.com.tr/GetNeighborhoods?CountyId=' +
          townList[town.index].Id,
      )
        .then(response => response.json())
        .then(data => {
          fetch(
            'https://www.milleni.com.tr/GetVillages?NeighborhoodId=' +
              data[0].Id,
          )
            .then(response => response.json())
            .then(data2 => {
              fetch(
                'https://www.milleni.com.tr/GetDistricts?VillageId=' +
                  data2[0].Id,
              )
                .then(response => response.json())
                .then(data3 => {
                  setDistrictList(data3);
                });
            });
        });
    }
  }, [city, town]);
  const register = () => {
    if (
      email.trim() === '' ||
      fullName.trim() === '' ||
      city.item.trim() === '' ||
      town.item.trim() === '' ||
      district.item.trim() === '' ||
      address.trim() === '' ||
      password.trim() === '' ||
      repeatPassword.trim() === ''
    ) {
      Alert.alert('Hata', 'Lütfen alanları boş bırakmayın.');
      return;
    }
    if (password !== repeatPassword) {
      Alert.alert('Hata', 'Şifreler uyuşmuyor.');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        const data = {
          email,
          fullName,
          city: city.item,
          town: town.item,
          district: district.item,
          address: address,
          phoneNumber: phoneNumber,
        };
        firestore()
          .collection('Users')
          .doc(email)
          .set(data)
          .then(() => {
            console.log('User added!');
            dispatch(setUserAction({email: email}));
          });
      })
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/emaıl-already-ın-use') {
          Alert.alert('Error', 'That email address is already in use!');
        }
        if (error.code === 'auth/ınvalıd-emaıl') {
          Alert.alert('Error', 'That email address is invalid!');
        }
        if (error.code === 'auth/weak-password') {
          Alert.alert('Error', 'Weak password');
        }
      });
  };
  return (
    <Container>
      <Header style={{backgroundColor: '#62B1F6'}}>
        <Left />
        <Body>
          <Title>Sign up</Title>
        </Body>
        <Right />
      </Header>
      <View style={styles.content}>
        <Content>
          <Form>
            <Item inlineLabel last>
              <Label>Email</Label>
              <Input value={email} onChangeText={text => setEmail(text)} />
            </Item>
            <Item inlineLabel last>
              <Label>Phone Number</Label>
              <Input keyboardType="number-pad" value={phoneNumber} onChangeText={text => setPhoneNumber(text)} />
            </Item>
            <Item inlineLabel last>
              <Label>Full Name</Label>
              <Input
                value={fullName}
                onChangeText={text => setFullName(text)}
              />
            </Item>
            <Item picker last>
              <Label>City</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select City"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={city.item}
                onValueChange={(item, index) => setCity({item, index})}>
                {cityList.map(item => (
                  <Picker.Item
                    label={item.Name}
                    value={item.Name}
                    key={item.id}
                  />
                ))}
              </Picker>
            </Item>
            <Item picker last>
              <Label>Town</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select City"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={town.item}
                onValueChange={(item, index) => setTown({item, index})}>
                {townList.map(item => (
                  <Picker.Item
                    label={item.Name}
                    value={item.Name}
                    key={item.id}
                  />
                ))}
              </Picker>
            </Item>
            <Item picker last>
              <Label>District</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select City"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={district.item}
                onValueChange={(item, index) => setDistrict({item, index})}>
                {districtList.map(item => (
                  <Picker.Item
                    label={item.Name}
                    value={item.Name}
                    key={item.id}
                  />
                ))}
              </Picker>
            </Item>
            <Item inlineLabel last>
              <Label>Address</Label>
              <Input value={address} onChangeText={text => setAddress(text)} />
            </Item>
            <Item inlineLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </Item>
            <Item inlineLabel last>
              <Label>Repeat Password</Label>
              <Input
                secureTextEntry={true}
                value={repeatPassword}
                onChangeText={text => setRepeatPassword(text)}
              />
            </Item>
          </Form>
          <Button
            full
            info
            rounded
            style={styles.button}
            onPress={() => register()}>
            <Text>Sign up</Text>
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
            <Text style={{color: 'gray'}}>Zaten bir hesabım var</Text>
          </TouchableOpacity>
        </Content>
      </View>
    </Container>
  );
};

export default Signup;

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    margin: 10,
  },
});
