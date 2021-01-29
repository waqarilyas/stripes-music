import React, { useEffect, useReducer, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import randomize from 'randomatic';
import firestore from '@react-native-firebase/firestore';
import { Avatar, ListItem } from 'react-native-elements';
import Block from '../../components/Block';
import ArtistsImageWithName from '../../components/ArtistImageWithName';
import reducer from '../../hooks/useReducer';
import styles from './styles';
import auth from '@react-native-firebase/auth';

const initialState = {
  artists: [],
  users: [],
};

const NewMessage = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [initializing, setInitializing] = useState(true);
  const uid = auth().currentUser.uid;

  useEffect(() => {
    setTimeout(() => {
      setInitializing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    firestore()
      .collection('artists')
      .get()
      .then((snapshot) => {
        let allArtists = [];
        snapshot.forEach((documents) => {
          allArtists.push(documents.data());
        });
        dispatch({ artists: allArtists });
      });
  }, []);

  useEffect(() => {
    firestore()
      .collection('users')
      .get()
      .then((snapshot) => {
        const allUsers = [];
        snapshot.forEach((doc) => {
          if (doc.data().isPaidUser && doc.data().id !== uid) {
            allUsers.push(doc.data());
          }
        });
        dispatch({ users: allUsers });
      });
  }, []);

  if (initializing) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const handleSubmit = async (item, type) => {
    let otherUser = {};
    if (type === 'artist') {
      otherUser = {
        name: `${item.firstName} ${item.lastName}`,
        image: item.imgUrl,
        id: item.id,
      };
    } else {
      otherUser = {
        name: item.fullName,
        image: item.profilePicture,
        id: item.id,
      };
    }
    navigation.navigate('MessageDetail', { otherUser });
  };

  return (
    <Block>
      <Text style={styles.intro}>Artists</Text>
      <FlatList
        data={state.artists}
        keyExtractor={() => randomize('Aa0!', 10)}
        renderItem={({ item, item: { imgUrl, id, firstName, lastName } }) => {
          const type = 'artist';
          return (
            <TouchableOpacity onPress={() => handleSubmit(item, type)}>
              <ArtistsImageWithName
                imgUrl={imgUrl}
                firstName={firstName}
                lastName={lastName}
              />
            </TouchableOpacity>
          );
        }}
      />
      <Text style={styles.intro}>Users</Text>
      <FlatList
        data={state.users}
        keyExtractor={() => randomize('Aa0!', 10)}
        renderItem={({ item, item: { fullName, profilePicture, id } }) => {
          const type = 'user';
          return (
            <TouchableOpacity onPress={() => handleSubmit(item, type)}>
              <View style={styles.container}>
                <ListItem containerStyle={{ backgroundColor: 'black' }}>
                  <Avatar
                    rounded
                    size="medium"
                    source={
                      profilePicture
                        ? {
                            uri: profilePicture,
                          }
                        : require('../../../Assets/Icons/icon-profile-placeholder.jpg')
                    }
                  />
                  <ListItem.Content>
                    <ListItem.Title style={styles.userTitle}>
                      {fullName}
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </Block>
  );
};

export default NewMessage;
