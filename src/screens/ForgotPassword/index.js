import React, { useReducer } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button as RNEButton, Overlay } from 'react-native-elements';

import styles from './styles';
import Block from '../../components/Block';
import { emailIcon, backIcon } from '../../../Assets/Icons';
import Button from '../../components/Button';
import Input from '../../components/Input';
import reducer from '../../hooks/useReducer';

const initialState = {
  email: '',
};

const resetPassword = (email, navigation) => {
  auth()
    .sendPasswordResetEmail(email)
    .then(() => navigation.navigate('Login'));
};

const ForgotPassword = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = () => {
    resetPassword(state.email, navigation);
  };

  return (
    <Block>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Forgot Password</Text>
        <>
          <Text> </Text>
        </>
      </View>

      <Text style={styles.topText}>
        Enter your emaill address so we can send you a reset password link
      </Text>
      <Input
        icon={emailIcon}
        name="Email"
        textContentType="emailAddress"
        capitalize="none"
        keyboardType="email-address"
        defaultValue={state.email}
        onChangeText={(input) => dispatch({ email: input })}
      />

      <Button onPress={handleSubmit} text="Reset" />
    </Block>
  );
};

export default ForgotPassword;
