import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const AccountSetting = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={{ color: 'white' }}>Go to Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={{ color: 'white' }}>Go to ChangePassword</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('NotificationSetting')}>
        <Text style={{ color: 'white' }}>Go to NotificationSetting</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Subscriptions')}>
        <Text style={{ color: 'white' }}>Go to Subscriptions</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TellAFriend')}>
        <Text style={{ color: 'white' }}>Go to TellAFriend</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountSetting;
