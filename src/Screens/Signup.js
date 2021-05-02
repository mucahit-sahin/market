import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Input,
  Item,
  Label,
  Left,
  Right,
  Text,
  Title,
  View,
} from 'native-base';
import React from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

const Signup = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const register = () => {
    if (
      email.trim() === '' ||
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
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input value={email} onChangeText={text => setEmail(text)} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </Item>
            <Item floatingLabel last>
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
