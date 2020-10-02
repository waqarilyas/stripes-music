import React from 'react';
import { Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import News from '../../screens/News';
import NewsDetails from '../../screens/NewsDetails';
import { searchIcon, backIcon, menudots } from '../../../Assets/Icons';

const Stack = createStackNavigator();

const NewsStack = ({ navigation, route: { name } }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="News"
        component={News}
        options={{
          header: () => <TabsMainHeader navigation={navigation} name={name} />,
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
    </Stack.Navigator>
  );
};

export default NewsStack;
