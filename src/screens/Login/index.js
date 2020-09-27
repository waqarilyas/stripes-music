import React from 'react';
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
import ValidationScheme from '../../utils/Validation';
import LoginUser from './utils';

const Login = ({ navigation }) => {
  return (
    <Block>
      <Text style={styles.headerText}>Login</Text>
      <Formik
        initialValues={{
          email: '',
          password: '',
          globalError: '',
        }}
        onSubmit={(values, actions) => LoginUser(values, actions)}
        validationSchema={ValidationScheme}>
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

            <Text style={styles.globalError}>
              {touched.globalError && errors.globalError
                ? errors.globalError
                : ''}
            </Text>
            <Button
              onPress={handleSubmit}
              text="Login"
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </Formik>

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
          onPress={() => onFacebookButtonPress()}
        />

        <RNEButton
          icon={<Image source={facebookIcon} />}
          iconRight
          title="Facebook"
          buttonStyle={styles.faceBookButton}
          titleStyle={styles.socialButtonText}
          onPress={() => onGoogleButtonPress()}
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
