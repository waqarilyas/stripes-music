import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import Spinner from 'react-native-loading-spinner-overlay';

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
import { SignUpVS } from '../../utils/Validation';
import RegisterUser from './utils';
import { ScrollView } from 'react-native-gesture-handler';

const initValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  globalErr: '',
};

const Signup = ({ navigation }) => {
  let emailInput = useRef(null);
  let passwordInput = useRef(null);
  let confirmPasswordInput = useRef(null);
  const [loading, setLoading] = useState(null);

  return (
    <Block>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backIcon} style={styles.headerIcon} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Sign Up</Text>
          <>
            <Text />
          </>
        </View>

        <Formik
          initialValues={initValues}
          onSubmit={(values, actions) =>
            RegisterUser(values, actions, navigation, setLoading)
          }
          validationSchema={SignUpVS}>
          {({ initialValues, errors, handleChange, handleSubmit, touched }) => (
            <>
              <Input
                icon={usernameIcon}
                name={'Full Name'}
                textType={'name'}
                capitalize={'words'}
                defaultValue={initialValues.name}
                onChangeText={handleChange('name')}
                onSubmitEditing={() => emailInput.current.focus()}
                autoCompleteType={'name'}
                returnKeyType={'next'}
              />
              <Text style={styles.error}>
                {touched.name && errors.name ? errors.name : ''}
              </Text>

              <Input
                reference={emailInput}
                icon={emailIcon}
                name="Email"
                textContentType="emailAddress"
                capitalize="none"
                keyboardType="email-address"
                defaultValue={initialValues.email}
                onChangeText={handleChange('email')}
                onSubmitEditing={() => passwordInput.current.focus()}
                autoCompleteType={'email'}
                returnKeyType={'next'}
              />
              <Text style={styles.error}>
                {touched.email && errors.email ? errors.email : ''}
              </Text>

              <Input
                reference={passwordInput}
                icon={passwordIcon}
                name="Password"
                textContentType="password"
                capitalize="none"
                secureTextEntry={true}
                defaultValue={initialValues.password}
                onChangeText={handleChange('password')}
                onSubmitEditing={() => confirmPasswordInput.current.focus()}
                autoCompleteType={'password'}
                returnKeyType={'next'}
              />
              <Text style={styles.error}>
                {touched.password && errors.password ? errors.password : ''}
              </Text>

              <Input
                reference={confirmPasswordInput}
                icon={passwordIcon}
                name="Confirm Password"
                textContentType="password"
                capitalize="none"
                secureTextEntry={true}
                defaultValue={initialValues.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                autoCompleteType={'password'}
                returnKeyType={'done'}
              />
              <Text style={styles.error}>
                {touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : ''}
              </Text>

              {errors.globalErr ? (
                <Text style={styles.globalError}>{errors.globalErr}</Text>
              ) : null}

              <Button onPress={handleSubmit} text="Signup" />
            </>
          )}
        </Formik>

        <View style={styles.loginSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password? </Text>
          </TouchableOpacity>
          <View style={styles.signupSection}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signup}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && (
        <Spinner
          animation={'fade'}
          cancelable={false}
          size={'large'}
          visible={loading}
        />
      )}
    </Block>
  );
};

export default Signup;
