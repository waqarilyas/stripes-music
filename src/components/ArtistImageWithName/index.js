import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import styles from './styles';

const ArtistsImageWithName = ({ imgUrl, firstName, lastName }) => {
  return (
    <View style={styles.container}>
      <ListItem containerStyle={{ backgroundColor: 'black' }}>
        <Avatar rounded size="medium" source={imgUrl} />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>Chester Jones</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      {/* <Badge
        status="error"
        containerStyle={{
          position: 'absolute',
          top: 0,
          right: 0,
          borderWidth: 0,
          elevation: 0,
        }}
        badgeStyle={{ backgroundColor: '#F5138E' }}
        value="9"
      /> */}
    </View>
  );
};

export default ArtistsImageWithName;
