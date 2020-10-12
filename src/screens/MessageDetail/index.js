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
  const docId = route.params.docId;

  const [messages, setMessages] = useState([]);
  const localUser = useUser();

  useEffect(() => {
    const getData = async () => {
      const chatId =
        uid < passedId
          ? uid.concat('**', passedId)
          : passedId.concat('**', uid);
      firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
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
                  text: text || '',
                  image: '',
                  createdAt:
                    createdAt.toDate() ||
                    firestore.FieldValue.serverTimestamp(),
                  user: {
                    name: name || '',
                    _id: _id || '',
                    avatar: avatar || '',
                  },
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

    const unsubscribe = getData();
    return () => unsubscribe;
  }, [passedId, uid]);

  const handleSend = async (msg) => {
    const chatId =
      uid < passedId ? uid.concat('**', passedId) : passedId.concat('**', uid);
    const text = msg[0].text;

    // update chat message collection
    await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        text,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: {
          _id: auth().currentUser.uid,
          name: localUser.fullName,
        },
      });

    // Save recent message
    await firestore()
      .collection('users')
      .doc(uid)
      .collection('inbox')
      .doc(docId)
      .set(
        {
          text,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
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
