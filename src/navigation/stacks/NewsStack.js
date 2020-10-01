import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Avatar } from 'react-native-elements';

import News from '../../screens/News';
import NewsDetails from '../../screens/NewsDetails';
import { searchIcon } from '../../../Assets/Icons';

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
      <stack.Screen name="NewsDetails" component={NewsDetails} />
    </stack.Navigator>
  );
};

export default NewsStack;
