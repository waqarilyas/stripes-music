import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';

import styles from './styles';
import Block from '../../components/Block';
import { emailIcon, backIcon } from '../../../Assets/Icons';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ForgotPasswordVS } from '../../utils/Validation';
import ResetPassword from './utils';

const initValues = {
  email: '',
  globalErr: '',
  isSent: false,
};

const ForgotPassword = ({ navigation }) => {
  return (
    <Block>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Forgot Password</Text>
        <>
          <Text> </Text>
        </>
      </View>

      <Text style={styles.topText}>
        Enter your emaill address so we can send you a reset password link
      </Text>

      <Formik
        initialValues={initValues}
        onSubmit={(values, actions) => ResetPassword(values, actions)}
        validationSchema={ForgotPasswordVS}>
        {({
          initialValues,
          errors,
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
        }) => (
          <>
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

            {errors.globalErr ? (
              <Text style={styles.globalError}>{errors.globalErr}</Text>
            ) : null}

            <Button
              onPress={handleSubmit}
              text="Reset Password"
              isSubmitting={isSubmitting}
            />

            {errors.isSent ? (
              <Text style={styles.message}>
                Password reset email sent to {values.email}
              </Text>
            ) : null}
          </>
        )}
      </Formik>
    </Block>
  );
};

export default ForgotPassword;
