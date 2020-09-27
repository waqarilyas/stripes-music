import React, { useReducer } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Button as RNEButton } from 'react-native-elements';

import Block from '../../components/Block';
import Button from '../../components/Button';
import styles from './styles';
import {
  emailIcon,
  passwordIcon,
  facebookIcon,
  googleIcon,
} from '../../../Assets/Icons';
import Input from '../../components/Input';
import reducer from '../../hooks/useReducer';
import onFacebookButtonPress from './FacebookLogin';
import onGoogleButtonPress from './GoogleLogin';

const initialState = {
  email: '',
  password: '',
};

const loginUser = (state, navigation) => {
  auth()
    .signInWithEmailAndPassword(state.email, state.password)
    .catch((err) => {
      console.log(err);
    });
};

const Login = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = () => {
    loginUser(state, navigation);
  };

  const handleFacebookLogin = () => {
    onFacebookButtonPress();
  };

  const handleGoogleLogin = () => {
    onGoogleButtonPress();
  };

  return (
    <Block>
      <View>
        <Text style={styles.headerText}>Login</Text>

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

        <Button onPress={handleSubmit} text="Login" />
      </View>

      <View style={styles.socialSection}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={styles.socialSignInText}>
          or sign in with social networks
        </Text>

        <RNEButton
          icon={<Image source={googleIcon} />}
          iconRight
          title="Google"
          buttonStyle={styles.socialButton}
          titleStyle={styles.socialButtonText}
          onPress={handleGoogleLogin}
        />

        <RNEButton
          icon={<Image source={facebookIcon} />}
          iconRight
          title="Facebook"
          buttonStyle={styles.faceBookButton}
          titleStyle={styles.socialButtonText}
          onPress={handleFacebookLogin}
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
