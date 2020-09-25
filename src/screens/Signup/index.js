import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './styles';
import Block from '../../components/Block';
import Input from '../../components/Input';
import {
  passwordIcon,
  usernameIcon,
  emailIcon,
  backIcon,
} from '../../../Assets/Icons';

const Signup = ({ navigation }) => {
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

      <Input icon={usernameIcon} name="Full Name" />
      <Input icon={emailIcon} name="Email" />
      <Input icon={passwordIcon} name="Enter Password" />
      <Input icon={passwordIcon} name="Repeat Password" />

      <Button
        type="solid"
        title="Signup"
        buttonStyle={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      />

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
