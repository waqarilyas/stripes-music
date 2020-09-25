import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './styles';
import Block from '../../components/Block';
import { emailIcon, backIcon } from '../../../Assets/Icons';
import Input from '../../components/Input';

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
        lorem ipsum dolor sit amet, consectetur adip ipsum dolor sit amet,
        consectetur adi
      </Text>
      <Input icon={emailIcon} name="Enter a valid Email" />
      <Button type="solid" title="Reset" buttonStyle={styles.loginButton} />
    </Block>
  );
};

export default ForgotPassword;
