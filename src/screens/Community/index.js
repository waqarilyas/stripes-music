import React, { useReducer, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Divider } from 'react-native-elements';
import randomize from 'randomatic';

import styles from './styles';
import ChatCard from '../../components/ChatCard';
import ChatScreenHeader from '../../components/ChatScreenHeader';
import reducer from '../../hooks/useReducer';
import { getCollection } from '../../utils/Firebase';

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

const initialState = {
  users: [],
};

const Community = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCollection('users', 100, (collection) =>
      dispatch({ users: collection }),
    );
  }, []);

  return (
    <View style={styles.container}>
      <ChatScreenHeader navigation={navigation} navigateTo="NewMessage" />
      <Text style={styles.title}>Messages</Text>

      {state.users.length ? (
        <FlatList
          data={state.users}
          keyExtractor={() => randomize(10)}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
          renderItem={({ item: { fullName, profilePicture } }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('MessageDetail')}>
                <ChatCard name={fullName} avatar={profilePicture} />
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <ActivityIndicator color="white" />
      )}
    </View>
  );
};

export default Community;
