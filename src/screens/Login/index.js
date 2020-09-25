import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';

import Block from '../../components/Block';
import styles from './styles';
import {
  emailIcon,
  passwordIcon,
  usernameIcon,
  facebookIcon,
  googleIcon,
} from '../../../Assets/Icons';

const Login = ({ navigation }) => {
  return (
    <Block>
      <View>
        <Text style={styles.headerText}>Login</Text>
        <Text style={styles.topText}>
          lorem ipsum dolor sit amet, consectetur adip ipsum dolor sit amet,
          consectetur adi
        </Text>

        <View style={styles.input}>
          <Image source={emailIcon} style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#515151"
            style={styles.textInput}
          />
        </View>

        <View style={styles.input}>
          <Image source={passwordIcon} style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#515151"
            styles={styles.textInput}
            style={styles.textInput}
          />
        </View>

        <Button type="solid" title="Login" buttonStyle={styles.loginButton} />
      </View>

      <View style={styles.socialSection}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password? </Text>
        </TouchableOpacity>
        <Text style={styles.socialSignInText}>
          or sign in with social networks
        </Text>

        <Button
          icon={<Image source={facebookIcon} />}
          iconRight
          title="Google"
          color=""
          buttonStyle={styles.socialButton}
          titleStyle={styles.socialButtonText}
        />
        <Button
          icon={<Image source={googleIcon} />}
          iconRight
          title="Facebook"
          color=""
          buttonStyle={styles.faceBookButton}
          titleStyle={styles.socialButtonText}
        />

        <View style={styles.signupSection}>
          <Text style={styles.signupText}>Do not have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signup}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Block>
  );
};

export default Login;
