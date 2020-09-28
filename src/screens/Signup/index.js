import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';

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
import ValidationSchema from '../../utils/Validation';
import RegisterUser from './utils';
import { ScrollView } from 'react-native-gesture-handler';

const initValues = {
  name: 'Test User 01',
  email: 'test.user.01@email.com',
  password: 'testpass',
  confirmPassword: 'testpass',
  globalErr: '',
};

const Signup = ({ navigation }) => {
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
          onSubmit={(values, actions) => RegisterUser(values, actions)}
          validationSchema={ValidationSchema}>
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
                icon={usernameIcon}
                name="Full Name"
                textType="name"
                capitalize="words"
                defaultValue={initialValues.name}
                onChangeText={handleChange('name')}
              />
              <Text style={styles.error}>
                {touched.name && errors.name ? errors.name : ''}
              </Text>

              <Input
                icon={emailIcon}
                name="Email"
                textContentType="emailAddress"
                capitalize="none"
                keyboardType="email-address"
                defaultValue={initialValues.email}
                onChangeText={handleChange('email')}
              />
              <Text style={styles.error}>
                {touched.email && errors.email ? errors.email : ''}
              </Text>

              <Input
                icon={passwordIcon}
                name="Password"
                textContentType="password"
                capitalize="none"
                secureTextEntry={true}
                defaultValue={initialValues.password}
                onChangeText={handleChange('password')}
              />
              <Text style={styles.error}>
                {touched.password && errors.password ? errors.password : ''}
              </Text>

              <Input
                icon={passwordIcon}
                name="Confirm Password"
                textContentType="password"
                capitalize="none"
                secureTextEntry={true}
                defaultValue={initialValues.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
              />
              <Text style={styles.error}>
                {touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : ''}
              </Text>

              {errors.globalErr ? (
                <Text style={styles.globalError}>{errors.globalErr}</Text>
              ) : null}

              <Button
                isSubmitting={isSubmitting}
                onPress={handleSubmit}
                text="Signup"
              />
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
    </Block>
  );
};

export default Signup;
