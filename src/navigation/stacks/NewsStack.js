import React from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Avatar } from 'react-native-elements';

import News from '../../screens/News';
import NewsDetails from '../../screens/NewsDetails';
import { searchIcon, backIcon, menudots } from '../../../Assets/Icons';

const stack = createStackNavigator();

const NewsStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="News"
        component={News}
        options={{
          title: 'News',
          headerLeft: () => (
            <Avatar
              rounded
              source={require('../../../Assets/Images/songCover3.jpg')}
            />
          ),
          headerRight: () => (
            <Image
              source={searchIcon}
              style={{ resizeMode: 'contain', height: 20, width: 20 }}
            />
          ),
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            alignSelf: 'center',
            fontSize: 22,
          },
        }}
      />
      <stack.Screen
        name="NewsDetails"
        component={NewsDetails}
        options={{
          title: '',
          headerLeft: () => (
            <Image
              source={backIcon}
              style={{
                resizeMode: 'contain',
                height: 20,
                widthwidth: 20,
                marginLeft: 10,
              }}
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={searchIcon}
                style={{
                  resizeMode: 'contain',
                  height: 20,
                  widthwidth: 20,
                }}
              />
              <Image
                source={menudots}
                style={{
                  resizeMode: 'contain',
                  height: 20,
                  widthwidth: 20,
                }}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: 'black',
          },
        }}
      />
    </stack.Navigator>
  );
};

export default NewsStack;
