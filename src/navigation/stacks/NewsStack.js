import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import News from '../../screens/News';
import NewsDetails from '../../screens/NewsDetails';
import { searchIcon, backIcon } from '../../../Assets/Icons';

const Stack = createStackNavigator();

const NewsStack = ({ navigation }) => {
  const search = (navigation) => (
    <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
      <Image source={searchIcon} style={styles.icon} />
    </TouchableOpacity>
  );
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
        name="News"
        component={News}
        options={({ navigation }) => ({
          title: 'News',
          headerTitleAlign: 'left',
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => search(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetails}
        options={({ navigation }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: () => search(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    marginRight: 18,
  },
  back: {
    resizeMode: 'contain',
    marginLeft: 18,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    resizeMode: 'contain',
    marginRight: 8,
  },
  headerStyle: {
    backgroundColor: 'black',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default NewsStack;
