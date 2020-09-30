import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Subscriptions = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('YourSubscriptions')}>
        <Text style={{ color: 'white' }}>Go to YourSubscriptions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditYourSubscription')}>
        <Text style={{ color: 'white' }}>Go to EditYourSubscription</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ViewNewOffers')}>
        <Text style={{ color: 'white' }}>Go to ViewNewOffers</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Subscriptions;
