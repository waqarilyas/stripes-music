import React from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import useUser from '../../hooks/useUser';

const Home = ({ navigation }) => {
  const currentUser = useUser();

  const handlePress = () => {
    auth().signOut();
  };

  return (
    <View style={styles.container}>
      {currentUser ? (
        <Text>{currentUser.uid}</Text>
      ) : (
        <Text>No user available</Text>
      )}
      <Button title="Sign Out" onPress={handlePress} />
    </View>
  );
};

export default Home;
