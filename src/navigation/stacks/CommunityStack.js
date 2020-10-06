import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-elements';

import Community from '../../screens/Community';
import NewMessage from '../../screens/NewMessage';
import MessageDetail from '../../screens/MessageDetail';
import { backIcon, menudots } from '../../../Assets/Icons';

const HeaderLeft = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={backIcon}
          style={{
            resizeMode: 'contain',
            height: hp('3'),
            width: hp('3'),
          }}
        />
      </TouchableOpacity>
      <Avatar
        rounded
        source={require('../../../Assets/Images/songCover1.jpg')}
      />
    </View>
  );
};
const HeaderRight = () => {
  return (
    <View>
      <Image
        source={menudots}
        style={{ resizeMode: 'contain', height: hp('3'), width: hp('3') }}
      />
    </View>
  );
};

const Stack = createStackNavigator();

const CommunityStack = ({ navigation }) => {
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
        options={{
          title: 'Artist',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: 25,
            alignSelf: 'center',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          headerLeft: null,
          containerStyle: {},
        }}
      />
      <Stack.Screen
        name="MessageDetail"
        component={MessageDetail}
        options={{
          title: 'Jordan Jacobs',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerRight: () => HeaderRight(),
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          containerStyle: {},
        }}
      />
    </Stack.Navigator>
  );
};

export default CommunityStack;
