import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { backIcon, searchIcon } from '../../../Assets/Icons';
import Community from '../../screens/Community';
import MessageDetail from '../../screens/MessageDetail';
import NewMessage from '../../screens/NewMessage';

const Stack = createStackNavigator();

const CommunityStack = () => {
  const search = () => <Image source={searchIcon} style={styles.icon} />;
  const back = (navigation) => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={backIcon} style={styles.back} />
      </TouchableOpacity>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Community"
        component={Community}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewMessage"
        component={NewMessage}
        options={({ navigation }) => ({
          title: 'Artists',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: search,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="MessageDetail"
        component={MessageDetail}
        options={({ navigation }) => ({
          headerTitleAlign: 'left',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  headerStyle: {
    backgroundColor: 'black',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  icon: {
    resizeMode: 'contain',
    marginRight: 18,
  },
  back: {
    resizeMode: 'contain',
    marginLeft: 18,
  },
});

export default CommunityStack;
