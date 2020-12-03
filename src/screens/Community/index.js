import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import randomize from 'randomatic';
import React, { useEffect, useReducer, useState } from 'react';
import {
  Alert, FlatList
} from 'react-native';
import ChatCard from '../../components/ChatCard';
import reducer from '../../hooks/useReducer';


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
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

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
    <>
      <FlatList
        data={state.inbox}
        contentContainerStyle={{ flex: 1, backgroundColor: 'black' }}
        keyExtractor={(item) => randomize(10)}
        // ListEmptyComponent={() => <EmptyChatList navigation={navigation} />}
        // ItemSeparatorComponent={() => <Divider style={styles.divider} />}
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
    </>
  );
};

export default Community;
