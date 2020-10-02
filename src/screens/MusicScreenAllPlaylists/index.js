import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';

import styles from './styles';
import Button from '../../components/Button';
import SongCardListView from '../../components/SongCardListView';
import Block from '../../components/Block';
//To be Used for navigation later

{
  /* <TouchableOpacity
onPress={() => navigation.navigate('MusicScreenCreateNewPlaylist')}>
<Text style={{ color: 'white' }}>Go to create new Playlist screen</Text>
</TouchableOpacity>
<TouchableOpacity
onPress={() => navigation.navigate('MusicScreenCreateNewPlaylist')}>
<Text style={{ color: 'white' }}>Go To Playlist Details</Text>
</TouchableOpacity> */
}

//ends here
const arts = ['ali-zafar', 'john-cena'];
const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const MusicScreenAllPlayLists = ({ navigation }) => {
  return (
    <Block>
      <View style={styles.topView}>
        <Text style={styles.title}>The Best Playlists</Text>
        <Text style={styles.subtitle}>
          A collection of all music recommended just for you. We hope you like
          it!
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={() => {
          return (
            <SongCardListView arts={arts} artist="Artist" title="Artist name" />
          );
        }}
      />
    </Block>
  );
};

export default MusicScreenAllPlayLists;
