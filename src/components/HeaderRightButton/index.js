import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import { searchIcon, profilePicPlaceholder } from '../../../Assets/Icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  displaySubscriptionScreen,
  setIsChatNotPaid,
} from '../../Redux/Reducers/helperSlice';
import styles from './styles';

const HeaderRightButton = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.root.firebase);
  const currentUser = auth().currentUser;

  const handleAuth = () => navigation.navigate('Login');
  const handleClick = () => {
    dispatch(displaySubscriptionScreen(true));
    dispatch(setIsChatNotPaid(true));
  };

  return (
    <View style={styles.container}>
      {currentUser && user?.isPaidUser ? (
        <Avatar
          rounded
          source={
            user?.profilePicture?.length > 0
              ? { uri: user.profilePicture }
              : profilePicPlaceholder
          }
          // renderPlaceholderContent={<ActivityIndicator color="white" />}
          onPress={() => navigation.navigate('Profile')}
        />
      ) : currentUser && user ? (
        <TouchableOpacity onPress={handleClick} style={styles.subContainer}>
          <Text style={styles.text}>.99</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleAuth} style={styles.subContainer}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
        <Image source={searchIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRightButton;
