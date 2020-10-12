import React, { useEffect, useState } from 'react';
import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
} from 'react-native-gifted-chat';
import { ActivityIndicator, View, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { sendIcon } from '../../../Assets/Icons';
import styles from './styles';
import useUser from '../../hooks/useUser';

const MessageDetail = ({ route, navigation }) => {
  navigation.setOptions({ title: route.params.name });

  const uid = auth().currentUser.uid;
  const passedId = route.params.passedId;

  const [messages, setMessages] = useState([]);
  const [artist, setArtist] = useState({});
  const localUser = useUser();

  useEffect(() => {
    const chatId =
      uid < passedId ? uid.concat('**', passedId) : passedId.concat('**', uid);

    const getData = async () => {
      const chatMessages = firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', 'desc');

      chatMessages.onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
        if (!snapshot.empty && snapshot?.docs) {
          var msg = snapshot.docs.map((doc) => {
            if (
              doc.exists &&
              doc.data() !== null &&
              doc.data()?.createdAt !== null
            ) {
              const {
                text,
                createdAt,
                user: { name, _id, avatar },
              } = doc.data();

              var data = {
                _id: doc.id,
                text,
                createdAt: createdAt.toDate(),
                user: { name, _id, avatar },
              };

              return data;
            } else {
              return {};
            }
          });
          setMessages(msg);
        }
      });
    };

    const getArtist = async () => {
      const artistDocument = firestore().collection('artists').doc(passedId);
      await artistDocument.get().then((value) => {
        if (value.exists) {
          setArtist(value.data());
        }
      });
    };

    firestore()
      .collection('chats')
      .doc(chatId)
      .get()
      .then((rootSnapshot) => {
        if (rootSnapshot.exists) {
          const readStatus = {};
          readStatus[`${uid}`] = true;
          rootSnapshot.ref.set({ readStatus }, { merge: true });
        }
      });

    getArtist();
    const unsubscribe = getData();

    return () => unsubscribe;
  }, [passedId, uid]);

  const handleSend = async (msg) => {
    const chatId =
      uid < passedId ? uid.concat('**', passedId) : passedId.concat('**', uid);
    const text = msg[0].text;

    let readStatus = {};
    readStatus[`${uid}`] = true;
    readStatus[`${passedId}`] = false;

    // Update recent messages
    const chatCollection = firestore().collection('chats').doc(chatId);
    chatCollection.set(
      {
        artist: {
          avatar: artist.imgUrl,
          id: artist.id,
          name: `${artist.firstName} ${artist.lastName}`,
        },
        members: [artist.id, uid],
        readStatus,
        recentMessage: {
          createdAt: firestore.FieldValue.serverTimestamp(),
          text,
        },
      },
      { merge: true },
    );

    // Add messages as documents to Chat collection
    const messageCollection = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages');
    await messageCollection.add({
      text,
      createdAt: firestore.FieldValue.serverTimestamp(),
      user: {
        _id: auth().currentUser.uid,
        name: localUser.fullName,
        avatar: localUser.profilePicture,
      },
    });

    // Update recent messages in user chat document
    // await userInboxDocument.set({
    //   artist: {
    //     avatar: artist.imgUrl,
    //     name: `${artist.firstName} ${artist.lastName}`,
    //     artistId: artist.id,
    //   },
    //   readStatus,
    //   createdAt: firestore.FieldValue.serverTimestamp(),
    //   text,
    //   updatedAt: firestore.FieldValue.serverTimestamp(),
    // });

    // Update recent messages in user artist document
    // await artistInboxDocument.set({
    //   artist: {
    //     avatar: artist.imgUrl,
    //     name: `${artist.firstName} ${artist.lastName}`,
    //     artistId: artist.id,
    //   },
    //   readStatus,
    //   text,
    //   createdAt: firestore.FieldValue.serverTimestamp(),
    //   updatedAt: firestore.FieldValue.serverTimestamp(),
    // });
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <Image source={sendIcon} style={styles.send} />
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: styles.leftWrapper,
          right: styles.rightWrapper,
        }}
        textStyle={{
          left: styles.textStyle,
          right: styles.textStyle,
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.input}
        textInputStyle={styles.textInput}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{
          _id: auth().currentUser.uid,
        }}
        inverted
        isLoadingEarlier
        minInputToolbarHeight={100}
        renderLoading={() => <ActivityIndicator color="white" />}
        renderSend={renderSend}
        renderBubble={renderBubble}
        alwaysShowSend
        renderInputToolbar={renderInputToolbar}
      />
    </View>
  );
};

export default MessageDetail;
