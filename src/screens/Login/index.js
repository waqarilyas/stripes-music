import { GoogleSignin } from '@react-native-community/google-signin';
import { Formik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Button as RNEButton } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  emailIcon,
  facebookIcon,
  googleIcon,
  passwordIcon,
} from '../../../Assets/Icons';
import Block from '../../components/Block';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { GOOGLE_WEB_CLIENT_ID } from '../../utils/Constants';
import { LoginVS } from '../../utils/Validation';
import onFacebookButtonPress from './FacebookLogin';
import onGoogleButtonPress from './GoogleLogin';
import styles from './styles';
import LoginUser from './utils';

const initValues = {
  email: '',
  password: '',
  globalError: '',
};

const Login = ({ navigation }) => {
  let formik = useRef(null);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: false,
    });
  };

  const handleGoogleLogin = () => {
    onGoogleButtonPress(setVisibility)
      .then(() => navigation.navigate('MainTabs'))
      .catch((err) => console.log(err));
  };

  const handleFacebookLogin = () => {
    onFacebookButtonPress(setVisibility)
      .then(() => navigation.navigate('MainTabs'))
      .catch((err) => console.log(err));
  };

  const signupHandler = () => {
    formik.current.resetForm(initValues);
    navigation.navigate('Signup');
  };

  return (
    <Block>
      <ScrollView style={styles.mainContainer}>
        <Formik
          innerRef={formik}
          initialValues={initValues}
          onSubmit={(values, actions) => LoginUser(values, actions, navigation)}
          validationSchema={LoginVS}>
          {({
            initialValues,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <>
              <Input
                icon={emailIcon}
                name="Email Address"
                error={errors.email}
                textContentType="emailAddress"
                capitalize="none"
                defaultValue={initialValues.email}
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                value={values.email}
              />
              <Text style={styles.error}>
                {touched.email && errors.email ? errors.email : ''}
              </Text>

              <Input
                icon={passwordIcon}
                name="Password"
                error={errors.password}
                defaultValue={initialValues.password}
                textContentType="password"
                capitalize="none"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                value={values.password}
              />
              <Text style={styles.error}>
                {touched.password && errors.password ? errors.password : ''}
              </Text>

              {errors.globalErr ? (
                <Text style={styles.globalError}>{errors.globalErr}</Text>
              ) : null}

              <Button
                onPress={handleSubmit}
                text={'Login'}
                isSubmitting={isSubmitting}
              />
            </>
          )}
        </Formik>

        <View style={styles.socialSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
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
            <TouchableOpacity onPress={signupHandler}>
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {visibility && (
        <Spinner
          animation={'fade'}
          cancelable={false}
          size={'large'}
          visible={visibility}
        />
      )}
    </Block>
  );
};

export default Login;
