import React from 'react';
import { View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import styles from './styles';

const ArtistsImageWithName = ({ imgUrl, firstName, lastName }) => {
  return (
    <View style={styles.container}>
      <ListItem containerStyle={{ backgroundColor: 'black' }}>
        <Avatar rounded size="medium" source={{ uri: imgUrl }} />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>
            {firstName} {lastName}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default ArtistsImageWithName;
