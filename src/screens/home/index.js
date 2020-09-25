import React from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';

//local imports
import styles from './styles';

const Home = ({navigation}) => {
  return (
    <View>
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <Text>Home Screen</Text>
    </View>
  );
};

export default Home;
