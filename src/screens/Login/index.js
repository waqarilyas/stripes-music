import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Button as RNEButton } from 'react-native-elements';
import { Formik } from 'formik';

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
import onFacebookButtonPress from './FacebookLogin';
import onGoogleButtonPress from './GoogleLogin';
import { LoginVS } from '../../utils/Validation';
import LoginUser from './utils';
import { ScrollView } from 'react-native-gesture-handler';

const initValues = {

  email: '',
  password: '',
  globalError: '',
};

const Login = ({ navigation }) => {

  let [state, setState] = useState({
    initValues: {
      email: '',
      password: '',
      globalError: '',
    }


  })
  return (
    <Block>
      <ScrollView>
        <Text style={styles.headerText}>Login</Text>
        <Formik
          initialValues={state.initValues}
          onSubmit={(values, actions) => LoginUser(values, actions, navigation)}
          validationSchema={LoginVS}>
          {({
            initialValues,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
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
              />
              <Text style={styles.error}>
                {touched.password && errors.password ? errors.password : ''}
              </Text>

              {errors.globalErr ? (
                <Text style={styles.globalError}>{errors.globalErr}</Text>
              ) : null}
              <Button
                onPress={handleSubmit}
                text="Login"
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
            onPress={async () => {
              let GoogleLoginResponse = await onGoogleButtonPress()
              if (GoogleLoginResponse)
                navigation.goBack();
            }}
          />

          <RNEButton
            icon={<Image source={facebookIcon} />}
            iconRight
            title="Facebook"
            buttonStyle={styles.faceBookButton}
            titleStyle={styles.socialButtonText}
            onPress={async () => {
              let FacebookLoginResponse = await onFacebookButtonPress()
              if (FacebookLoginResponse)
                navigation.goBack();
            }}
          />

          <View style={styles.signupSection}>
            <Text style={styles.signupText}>Do not have an account?</Text>
            <TouchableOpacity onPress={() => {
              setState(prev => ({
                ...prev, initValues: {
                  email: '',
                  password: '',
                  globalError: '',
                }
              }))
              navigation.navigate('Signup')
            }}>
              <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Block>
  );
};

export default Login;
