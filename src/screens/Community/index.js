import React, { useReducer, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { Divider } from 'react-native-elements';
import randomize from 'randomatic';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import ChatCard from '../../components/ChatCard';
import ChatScreenHeader from '../../components/ChatScreenHeader';
import reducer from '../../hooks/useReducer';
import EmptyChatList from '../../components/EmptyChatList';

const initialState = {
  inbox: [],
};

const findChatId = (userId, passedId) => {
  return userId < passedId
    ? userId.concat('**', passedId)
    : passedId.concat('**', userId);
};

const Community = ({ navigation }) => {
  const uid = auth().currentUser.uid;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const listener = firestore()
      .collection('chats')
      .where('members', 'array-contains', uid)
      .onSnapshot((snapshot) => {
        let documents = [];
        snapshot.docs.forEach((document) => {
          documents.push(document.data());
        });
        dispatch({ inbox: documents });
      });

    return () => listener;
  }, [uid]);

  const alertDelete = (id) =>
    Alert.alert(
      'Deleting Chat',
      'Are you sure, you want to delete the chat?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () =>
            handleDelete(id).then(async () => {
              const chatId = findChatId(uid, id);
              const chatDocument = firestore().collection('chats').doc(chatId);
              await chatDocument
                .delete()
                .then(() => console.log('Document Deleted!'));
            }),
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );

  const handleDelete = async (id) => {
    const chatId = findChatId(uid, id);
    const messageCollections = await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .get();

    const batch = firestore().batch();

    messageCollections.forEach((documentSnapshot) => {
      batch.delete(documentSnapshot.ref);
    });

    return batch.commit();
  };

  return (
    <View style={styles.container}>
      <ChatScreenHeader navigation={navigation} navigateTo="NewMessage" />
      <Text style={styles.title}>Messages</Text>

      <FlatList
        data={state.inbox}
        contentContainerStyle={{ height: '100%' }}
        keyExtractor={() => randomize(10)}
        ListEmptyComponent={() => <EmptyChatList />}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item }) => {
          return (
            <ChatCard
              name={item.artist.name}
              avatar={item.artist.avatar}
              message={item.recentMessage.text}
              status={item.readStatus[`${uid}`]}
              onPress={() => {
                navigation.navigate('MessageDetail', {
                  passedId: item.artist.id,
                  name: item.artist.name,
                });
              }}
              onDeletePress={() => alertDelete(item.artist.id)}
            />
          );
        }}
      />
    </View>
  );
};

export default Community;
