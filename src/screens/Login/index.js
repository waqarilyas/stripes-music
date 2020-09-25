import React from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';

//local imports
import styles from './styles';

const Login = ({navigation}) => {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('App')} />
    </View>
  );
};

export default Login;
