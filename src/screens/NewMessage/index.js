import React from 'react';
import { View, Text, FlatList } from 'react-native';

import Block from '../../components/Block';
import styles from './styles';
import ArtistsImageWithName from '../../components/ArtistImageWithName';

const NewMessage = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return (
    <Block>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <ArtistsImageWithName
              imgUrl={require('.././../../Assets/Images/songCover1.jpg')}
            />
          );
        }}
      />
    </Block>
  );
};

export default NewMessage;
