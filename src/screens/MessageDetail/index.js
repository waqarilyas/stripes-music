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
  const { otherUser } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: otherUser.name,
    });
  }, [navigation]);

  const uid = auth().currentUser?.uid;
  const passedId = otherUser.id;

  const [messages, setMessages] = useState([]);
  const localUser = useUser();

  useEffect(() => {
    const chatId =
      uid < passedId ? uid.concat('**', passedId) : passedId.concat('**', uid);

    const getData = async () => {
      const chatMessages = await firestore()
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


              let data = {
                _id: doc.id,
                text,
                createdAt: createdAt,
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
        otherUser: {
          avatar: otherUser.image,
          id: otherUser.id,
          name: otherUser.name,
        },
        user: {
          avatar: localUser.profilePicture,
          id: auth().currentUser?.uid,
          name: localUser.fullName,
        },
        members: [otherUser.id, uid],
        readStatus,
        recentMessage: {
          createdAt: +new Date(),
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
      createdAt: +new Date(),
      sentBy: 'user',
      user: {
        _id: auth().currentUser?.uid,
        name: localUser.fullName,
        avatar: localUser.profilePicture,
      },
    });
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
          _id: auth().currentUser?.uid,
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
