import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import Block from '../../components/Block';
import styles from './styles';
import {
  emailIcon,
  passwordIcon,
  facebookIcon,
  googleIcon,
} from '../../../Assets/Icons';

const loginUser = (email, password, navigation) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then((_user) => {
      navigation.navigate('Home');
    });
};

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    loginUser(email, password, navigation);
  };

  return (
    <Block>
      <View>
        <Text style={styles.headerText}>Login</Text>

        <View style={styles.input}>
          <Image source={emailIcon} style={styles.inputIcon} />
          <TextInput
            textContentType="emailAddress"
            placeholder="Email"
            placeholderTextColor="#515151"
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="email-address"
            defaultValue={email}
            onChangeText={(e) => setEmail(e)}
          />
        </View>

        <View style={styles.input}>
          <Image source={passwordIcon} style={styles.inputIcon} />
          <TextInput
            textContentType="password"
            placeholder="Password"
            secureTextEntry
            selectTextOnFocus
            defaultValue={password}
            placeholderTextColor="#515151"
            style={styles.textInput}
            onChangeText={(e) => setPassword(e)}
          />
        </View>

        <Button
          type="solid"
          title="Login"
          titleStyle={styles.loginButtonText}
          buttonStyle={styles.loginButton}
          onPress={handleSubmit}
        />
      </View>

      <View style={styles.socialSection}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password? </Text>
        </TouchableOpacity>

        <Text style={styles.socialSignInText}>
          or sign in with social networks
        </Text>

        <Button
          icon={<Image source={googleIcon} />}
          iconRight
          title="Google"
          buttonStyle={styles.socialButton}
          titleStyle={styles.socialButtonText}
        />

        <Button
          icon={<Image source={facebookIcon} />}
          iconRight
          title="Facebook"
          buttonStyle={styles.faceBookButton}
          titleStyle={styles.socialButtonText}
        />

        <View style={styles.signupSection}>
          <Text style={styles.signupText}>Do not have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Block>
  );
};

export default Login;
