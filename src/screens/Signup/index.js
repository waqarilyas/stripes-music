import React, { useReducer } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import Block from '../../components/Block';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  passwordIcon,
  usernameIcon,
  emailIcon,
  backIcon,
} from '../../../Assets/Icons';
import reducer from '../../hooks/useReducer';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const registerUser = (state, navigation) => {
  auth()
    .createUserWithEmailAndPassword(state.email, state.password)
    .then((result) => {
      firestore()
        .collection('users')
        .doc(result.user.uid)
        .set({
          id: result.user.uid,
          fullName: state.name,
          email: state.email,
          isPaidUser: false,
          isActive: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
          subscribedAt: null,
          fbAccessToken: '',
          googleAccessToken: '',
          fbUserId: '',
          profilePicture: '',
          isAdmin: false,
        })
        .then(() => {
          navigation.navigate('App');
        });
    })
    .catch((err) => console.log(err));
};

const Signup = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = () => {
    registerUser(state, navigation);
  };

  return (
    <Block>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.headerIcon} />
        </TouchableOpacity>

        <Text style={styles.headerText}>Sign Up</Text>
        <>
          <Text />
        </>
      </View>

      <Input
        icon={usernameIcon}
        name="Full Name"
        textType="name"
        capitalize="words"
        defaultValue={state.name}
        onChangeText={(input) => dispatch({ name: input })}
      />

      <Input
        icon={emailIcon}
        name="Email"
        textContentType="emailAddress"
        capitalize="none"
        keyboardType="email-address"
        defaultValue={state.email}
        onChangeText={(input) => dispatch({ email: input })}
      />

      <Input
        icon={passwordIcon}
        name="Password"
        textContentType="password"
        capitalize="none"
        secureTextEntry={true}
        defaultValue={state.password}
        onChangeText={(input) => dispatch({ password: input })}
      />

      <Input
        icon={passwordIcon}
        name="Confirm Password"
        textContentType="password"
        capitalize="none"
        secureTextEntry={true}
        defaultValue={state.confirmPassword}
        onChangeText={(input) => dispatch({ confirmPassword: input })}
      />

      <Button onPress={handleSubmit} text="Signup" />

      <View style={styles.loginSection}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password? </Text>
        </TouchableOpacity>
        <View style={styles.signupSection}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signup}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Block>
  );
};

export default Signup;
