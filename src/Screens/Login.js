import React from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  View,
  Left,
  Body,
  Title,
  Right,
} from 'native-base';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const login = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please do not leave the fields blank.');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('login');
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
          <Title>Login</Title>
        </Body>
        <Right />
      </Header>
      <View style={styles.content}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                textContentType="emailAddress"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </Item>
            <Button
              full
              info
              rounded
              style={styles.button}
              onPress={() => login()}>
              <Text>Login</Text>
            </Button>
          </Form>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
            <Text style={{color: 'gray'}}>Hesabın yok mu?</Text>
          </TouchableOpacity>
        </Content>
      </View>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    marginHorizontal: 10,
  },
});
