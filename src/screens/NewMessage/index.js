import React, { useEffect, useReducer } from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight } from 'react-native';
import randomize from 'randomatic';
import firestore from '@react-native-firebase/firestore';

import Block from '../../components/Block';
import ArtistsImageWithName from '../../components/ArtistImageWithName';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import reducer from '../../hooks/useReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';

const initialState = {
  artists: [],
};

const NewMessage = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  return (
    <Block>
      <Text style={styles.intro}>Select an artist to chat with</Text>
      <FlatList
        data={state.artists}
        keyExtractor={() => randomize('Aa0!', 10)}
        renderItem={({ item, item: { imgUrl, firstName, lastName } }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MessageDetail');
              }}>
              <ArtistsImageWithName
                imgUrl={imgUrl}
                firstName={firstName}
                lastName={lastName}
              />
            </TouchableOpacity>
          );
        }}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  intro: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp('2'),
    marginVertical: hp('3'),
  },
});

export default NewMessage;
