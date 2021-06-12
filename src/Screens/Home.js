import React from 'react';

import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Item,
  Label,
  Picker,
  Text,
  Title,
  View,
} from 'native-base';
import Advertising from '../Components/Advertising';
import Loading from '../Components/Loading';

const Home = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [city, setCity] = React.useState('');
  const [town, setTown] = React.useState('');
  const [district, setDistrict] = React.useState('');

  const [cityList, setCityList] = React.useState([]);
  const [townList, setTownList] = React.useState([]);
  const [districtList, setDistrictList] = React.useState([]);
  React.useEffect(() => {
    setLoading(true);
    fetch('https://www.milleni.com.tr/GetCities')
      .then(response => response.json())
      .then(data => {
        setCityList(data);
        setLoading(false);
      });
    if (cityList.length > 0) {
      setLoading(true);
      fetch(
        'https://www.milleni.com.tr/GetCounties?cityId=' +
          cityList[city.index].Id,
      )
        .then(response => response.json())
        .then(data => {
          setTownList(data);
          setLoading(false);
        });
    }
    if (townList.length > 0) {
      setLoading(true);
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
    setLoading(false);
  }, [city, town]);
  return (
    <Container>
      <Header style={{backgroundColor: '#62B1F6'}}>
        <Body>
          <Title>Ana Sayfa</Title>
        </Body>
      </Header>
      <Content>
        <Advertising />
        <View style={{margin: 10}}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Item last style={{justifyContent: 'center'}}>
                <Label>Adres</Label>
              </Item>
              <Item picker last>
                <Label>İl</Label>
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
              <Item picker>
                <Label>İlçe</Label>
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
              <Item picker>
                <Label>Mahalle</Label>
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
            </>
          )}
        </View>
      </Content>
      <Button
        full
        rounded
        style={{backgroundColor: '#62B1F6', margin: 10}}
        onPress={() =>
          navigation.navigate('ShopList', {
            city: city.item,
            town: town.item,
            district: district.item,
          })
        }>
        <Text>Marketleri Listele</Text>
      </Button>
    </Container>
  );
};

export default Home;
