import React, { useReducer, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Divider } from 'react-native-elements';
import randomize from 'randomatic';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import ChatCard from '../../components/ChatCard';
import ChatScreenHeader from '../../components/ChatScreenHeader';
import reducer from '../../hooks/useReducer';

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
  inbox: [],
};

const Community = ({ navigation }) => {
  const uid = auth().currentUser.uid;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('inbox')
      .onSnapshot((querySnapshot) => {
        let documents = [];
        querySnapshot.forEach((document) => {
          documents.push(document.data());
        });
        dispatch({ inbox: documents });
      });

    return () => listener;
  }, [uid]);

  return (
    <View style={styles.container}>
      <ChatScreenHeader navigation={navigation} navigateTo="NewMessage" />
      <Text style={styles.title}>Messages</Text>

      <FlatList
        data={state.inbox}
        keyExtractor={() => randomize(10)}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MessageDetail', {
                  passedId: item.friend.uid,
                  docId: item.id,
                  name: item.friend.name,
                })
              }>
              <ChatCard
                avatar={item.friend.avatar}
                name={item.friend.name}
                message={item.text}
                createdAt={item.createdAt}
                status={item.readStatus[`${uid}`]}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Community;
