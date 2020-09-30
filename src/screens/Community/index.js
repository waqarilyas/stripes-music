import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import randomize from 'randomatic';

import styles from './styles';
import ChatCard from '../../components/ChatCard';
import ChatScreenHeader from '../../components/ChatScreenHeader';

// Data to be used later
{
  /* <TouchableOpacity onPress={() => navigation.navigate('NewMessage')}>
<Text style={{ color: 'white' }}>Go to NewMessage</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => navigation.navigate('MessageDetail')}>
<Text style={{ color: 'white' }}>Go to MessageDetail</Text>
</TouchableOpacity> */
}
//Data to be used ends here

const Community = ({ navigation }) => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  return (
    <ScrollView style={styles.container}>
      <ChatScreenHeader navigation={navigation} navigateTo="NewMessage" />
      <Text style={styles.title}>Messages</Text>

      <FlatList
        data={data}
        keyExtractor={() => randomize(10)}
        renderItem={() => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('MessageDetail')}>
              <ChatCard />
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
};

export default Community;
