import React, { useReducer, useEffect, useState } from 'react';
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={searchVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.topSearchContainer}>
          <View style={styles.searchWithClose}>
            <View style={styles.searchContainer}>
              <Image source={searchIcon} style={styles.searchIcon} />
              <TextInput
                placeholder="Search..."
                style={styles.textInput}
                textStyle={{ color: 'white' }}
                placeholderTextColor="#918E96"
              />
            </View>
            <Text style={styles.closeButton} onPress={() => toggleSearch()}>
              Close
            </Text>
          </View>
        </View>
      </Modal>

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
    </>
  );
};

export default Community;
